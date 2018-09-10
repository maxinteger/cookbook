import * as React from 'react'
import { pipe } from 'ramda'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import { RouteComponentProps, withRouter } from 'react-router'
import { getRecipe } from '../service/recipe'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Divider from '@material-ui/core/Divider/Divider'

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{ recipeId: string }> {}

interface State {
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
      this.setState({ loading: true })
      const recipeId = this.props.match.params.recipeId
      getRecipe(recipeId)
        .then(recipe => this.setState({ loading: false, recipe }))
        .catch(error => this.setState({ loading: false, error }))
    }

    public render() {
      const { classes } = this.props
      return (
        <main className={classes.layout}>
          <Paper className={classes.paper}>{this.renderContent()}</Paper>
        </main>
      )
    }

    private renderContent() {
      const { classes } = this.props;
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

      return <CircularProgress className={classes.progress} size={50}/>
    }

    private renderRecipe() {
      const { recipe } = this.state
      if (!recipe) {
        return <div />
      }

      return (
        <>
          <Typography variant="title">{recipe.title}</Typography>
          <Divider/>
          <Typography variant="body2">{recipe.description}</Typography>
        </>
      )
    }
  }
)
