import * as React from 'react'
import { SyntheticEvent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { recipeService } from '../service'
import { ModalResponse, Recipe } from '../service/model'

interface Props {
  open: boolean
  recipeId?: string
  onClose: (result: ModalResponse) => void
}

interface State {
  recipe: Recipe
}

const defaultRecipe = {
  title: '',
  description: ''
}

export class RecipeModal extends React.Component<Props, State> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.open) {
      this.setState({ recipe: defaultRecipe })
      if (nextProps.recipeId) {
        recipeService
          .get(nextProps.recipeId)
          .then(recipe => console.log(recipe) || this.setState({ recipe }))
      }
    }
  }

  private store = () => {
    recipeService.store(this.state.recipe).then(() => this.props.onClose(ModalResponse.OK))
  }

  private changeValue = (e: SyntheticEvent<any>) => {
    const { name, value } = e.currentTarget
    const { recipe } = this.state
    this.setState({ recipe: { ...recipe, [name]: value } })
  }

  private cancel = () => this.props.onClose(ModalResponse.Cancel)

  public render() {
    const { open } = this.props
    if (!open) {
      return null
    }

    const { recipe } = this.state

    return (
      <Dialog open={open} onClose={this.cancel}>
        <DialogTitle>Új rencept felvitele</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="recipe-title"
                name="title"
                label="Recept neve"
                fullWidth
                onChange={this.changeValue}
                value={recipe.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="recipe-description"
                name="description"
                label="Elkészítésu útmutató"
                multiline
                rows={10}
                rowsMax={20}
                fullWidth
                onChange={this.changeValue}
                value={recipe.description}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.cancel}>
            Mégsem
          </Button>
          <Button variant="contained" color="primary" onClick={this.store}>
            Mentés
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
