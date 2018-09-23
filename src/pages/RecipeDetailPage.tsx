import * as React from 'react'
import {pipe} from 'ramda'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import IconButton from '@material-ui/core/IconButton/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {RouteComponentProps, withRouter} from 'react-router'
import {recipeService} from '../service'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Divider from '@material-ui/core/Divider/Divider'
import {ModalResponse, Recipe} from '../service/model'
import Grid from '@material-ui/core/Grid/Grid'
import EditIcon from '@material-ui/icons/Edit'
import {RecipeModal} from '../components/RecipeModal'

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{ recipeId: string }> {}

interface State {
  open: boolean
  recipe: Recipe
  loading: boolean
  error: any
}

const styles: any = ({ breakpoints, spacing }: any) => ({
  layout: {
    width: 'auto',
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    [breakpoints.up(800 + spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: spacing.unit * 3,
    marginBottom: spacing.unit * 3,
    padding: spacing.unit * 2,
    [breakpoints.up(600 + spacing.unit * 3 * 2)]: {
      marginTop: spacing.unit * 6,
      marginBottom: spacing.unit * 6,
      padding: spacing.unit * 3
    }
  },
  progress: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export const RecipeDetailPage = pipe(
  withRouter,
  withStyles(styles)
)(
  class extends React.Component<Props, State> {
    state = {} as State

    componentDidMount() {
      this.loadData()
    }

    private loadData() {
      this.setState({ loading: true })
      const recipeId = this.props.match.params.recipeId
      recipeService
        .get(recipeId)
        .then(recipe => this.setState({ loading: false, recipe }))
        .catch(error => this.setState({ loading: false, error }))
    }

    private back = () => {
      this.props.history.push('/')
    }

    private edit = () => {
      this.setState({ open: true })
    }

    private handleClose = (res: ModalResponse) => {
      this.setState({ open: false })
      if (res === ModalResponse.OK) {
        this.loadData()
      }
    }

    public render() {
      const { classes } = this.props
      const { open } = this.state
      const recipeId = this.props.match.params.recipeId

      return (
        <main className={classes.layout}>
          <Paper className={classes.paper}>{this.renderContent()}</Paper>
          <RecipeModal open={open} recipeId={recipeId} onClose={this.handleClose} />
        </main>
      )
    }

    private renderContent() {
      const { classes } = this.props
      const { error, recipe } = this.state
      if (error) {
        return (
          <Typography align="center" variant="caption" color="error">
            Upsz. A recept nemtalálható
          </Typography>
        )
      }

      if (recipe) {
        return this.renderRecipe()
      }

      return <CircularProgress className={classes.progress} size={50} />
    }

    private renderRecipe() {
      const { recipe } = this.state
      if (!recipe) {
        return <div />
      }

      return (
        <>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <IconButton aria-label="Vissza" onClick={this.back}>
              <ArrowBack />
            </IconButton>
            <IconButton aria-label="Szerkesztés" onClick={this.edit}>
              <EditIcon />
            </IconButton>
            <Typography variant="title">{recipe.title}</Typography>
          </Grid>
          <Divider />
          <Typography variant="body2">{recipe.description}</Typography>
        </>
      )
    }
  }
)
