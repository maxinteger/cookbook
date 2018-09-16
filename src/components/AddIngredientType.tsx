import * as React from 'react'
import { SyntheticEvent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { ingredientTypeService } from '../service'
import { IngredientType, ModalResponse, Unit } from '../service/model'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Select from '@material-ui/core/Select/Select'
import FormControl from '@material-ui/core/FormControl/FormControl'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'

interface Props {
  open: boolean
  onClose: (result: ModalResponse) => void
}

interface State {
  ingredient: IngredientType
}

export class AddIngredientType extends React.Component<Props, State> {
  state = {
    ingredient: {
      id: undefined,
      name: '',
      defaultUnit: Unit.g,
      defaultValue: 1
    }
  }
  private store = () => {
    ingredientTypeService
      .store(this.state.ingredient)
      .then(() => this.props.onClose(ModalResponse.OK))
  }

  private changeValue = (e: SyntheticEvent<any>) => {
    const { name, value } = e.target as any
    const { ingredient } = this.state
    this.setState({ ingredient: { ...ingredient, [name]: value } })
  }

  private cancel = () => this.props.onClose(ModalResponse.Cancel)

  public render() {
    const { open } = this.props
    const { ingredient } = this.state
    const title = ingredient.id ? `${ingredient.name} módosítása` : 'Új hozzávaló típus felvétele'

    return (
      <Dialog open={open} onClose={this.cancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="recipe-title"
                name="name"
                label="Hozzávaló neve"
                fullWidth
                onChange={this.changeValue}
              />
            </Grid>
            <Grid item xs={6}>
              {this.renderUnitSelect()}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                type="number"
                id="ingredient-default-value"
                name="defaultValue"
                label="Alapértelmezett mennyiség"
                fullWidth
                inputProps={{
                  min: 0
                }}
                defaultValue={ingredient.defaultValue}
                onChange={this.changeValue}
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

  private renderUnitSelect() {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="age-simple">Alapértelmezett mértékegység</InputLabel>
        <Select
          value={this.state.ingredient.defaultUnit}
          onChange={this.changeValue}
          inputProps={{
            name: 'defaultUnit',
            id: 'ingredient-default-unit'
          }}
        >
          <MenuItem value={Unit.g}>Gramm</MenuItem>
          <MenuItem value={Unit.ml}>Milliliter</MenuItem>
          <MenuItem value={Unit.packer}>Csomag</MenuItem>
        </Select>
      </FormControl>
    )
  }
}
