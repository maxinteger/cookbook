import * as React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import { RecipeModal } from '../components/RecipeModal'
import { recipeService } from '../service'
import { pipe } from 'ramda'
import { RouteComponentProps, withRouter } from 'react-router'
import { Recipe } from '../service/model'

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{ recipeId: string }> {}

interface State {
  open: boolean
  recipes: Recipe[]
}

const styles: any = (theme: any) => ({
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: 'grey'
  },
  cardContent: {
    flexGrow: 1
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
})

export const Home = pipe(
  withRouter,
  withStyles(styles)
)(
  class extends React.Component<Props, State> {
    state = {
      open: false,
      recipes: []
    }

    public componentDidMount() {
      recipeService.getAll().then(recipes => console.log(recipes) || this.setState({ recipes }))
    }

    private openModal = () => this.setState({ open: true })

    private handleClose = () => this.setState({ open: false })

    private selectRecipe = (recipeId: string) => () => {
      this.props.history.push(`recipe/${recipeId}`)
    }

    public render() {
      const { classes } = this.props

      return (
        <main>
          <Button
            className={classes.addButton}
            variant="fab"
            color="secondary"
            onClick={this.openModal}
          >
            <AddIcon />
          </Button>
          <RecipeModal open={this.state.open} onClose={this.handleClose} />

          <div className={`${classes.layout} ${classes.cardGrid}`}>
            <Grid container spacing={40}>
              {this.state.recipes.map(this.renderRecipe)}
            </Grid>
          </div>
        </main>
      )
    }

    private renderRecipe = (recipe: Recipe) => {
      const { classes } = this.props
      return (
        <Grid item key={recipe.id} sm={6} md={4} lg={3}>
          <Card className={classes.card} onClick={this.selectRecipe(recipe.id as string)}>
            <CardMedia className={classes.cardMedia} image="" title="Image title" />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="headline" component="h2">
                {recipe.title}
              </Typography>
              <Typography>{recipe.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      )
    }
  }
)
