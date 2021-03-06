import * as React from 'react'
import { pipe } from 'ramda'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import IconButton from '@material-ui/core/IconButton/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { RouteComponentProps, withRouter } from 'react-router'
import { ingredientTypeService } from '../service'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Divider from '@material-ui/core/Divider/Divider'
import Button from '@material-ui/core/Button/Button'
import { AddIngredientType } from '../components/AddIngredientType'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import { IngredientType, ModalResponse } from '../service/model'
import Grid from '@material-ui/core/Grid/Grid'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import EditIcon from '@material-ui/icons/Edit'

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{ recipeId: string }> {}

interface State {
  open: boolean
  selectedItemId?: string
  ingredientTypes: IngredientType[]
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
  list: {
    marginTop: spacing.unit * 3,
    marginBottom: spacing.unit * 3
  },
  progress: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export const IngredientList = pipe(
  withRouter,
  withStyles(styles)
)(
  class extends React.Component<Props, State> {
    state = {
      open: false,
      ingredientTypes: [],
      loading: false,
      error: undefined,
      selectedItemId: undefined
    } as State

    componentDidMount() {
      this.loadData()
    }

    private loadData() {
      this.setState({ loading: true })
      ingredientTypeService
        .getAll()
        .then(ingredientTypes => this.setState({ loading: false, ingredientTypes }))
        .catch(error => this.setState({ loading: false, error }))
    }

    private openModal = () => this.setState({ open: true })

    private handleClose = (res: ModalResponse) => {
      this.setState({ open: false, selectedItemId: undefined })
      if (res === ModalResponse.OK) {
        this.loadData()
      }
    }

    private back = () => {
      this.props.history.push('/')
    }

    private editIngredient = (id?: string) => () => {
      this.setState({ open: true, selectedItemId: id })
    }

    public render() {
      const { classes } = this.props
      const { open, selectedItemId } = this.state
      return (
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <IconButton aria-label="Vissza" onClick={this.back}>
                <ArrowBack />
              </IconButton>
              <Typography variant="title">Hozzávalók listája</Typography>
            </Grid>
            <div className={classes.list}>{this.renderContent()}</div>
            <div>
              <Button variant="contained" color="primary" onClick={this.openModal}>
                Új hozzávaló felvétele
              </Button>
            </div>
            <AddIngredientType
              open={open}
              ingredientId={selectedItemId}
              onClose={this.handleClose}
            />
          </Paper>
        </main>
      )
    }

    private renderContent() {
      const { classes } = this.props
      const { error, loading } = this.state
      if (error) {
        return (
          <Typography align="center" variant="caption" color="error">
            Upsz. Valami hiba történt.
          </Typography>
        )
      }

      if (loading) {
        return <CircularProgress className={classes.progress} size={50} />
      }

      return this.renderIngredientTypes()
    }

    private renderIngredientTypes() {
      const { ingredientTypes } = this.state
      if (!ingredientTypes.length) {
        return <Typography>Üres lista</Typography>
      }

      return <List>{ingredientTypes.map(this.renderIngredientType)}</List>
    }

    private renderIngredientType = (item: IngredientType) => {
      return (
        <React.Fragment key={item.id}>
          <ListItem button onClick={this.editIngredient(item.id)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          <Divider light />
        </React.Fragment>
      )
    }
  }
)
