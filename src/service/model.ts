export interface BaseModel {
  id?: string
}

export interface Recipe extends BaseModel {
  title: string
  description: string
  ingredientGroups?: {
    groupTitle: string
    ingredients: Ingredient[]
  }
}

export interface Ingredient {
  type: IngredientType
  value: number
}

export interface IngredientType extends BaseModel {
  name: string
  defaultUnit: Unit
  defaultValue: number
  // altUnits: {}
}

export const enum ModalResponse {
  Cancel,
  OK
}

export const enum Unit {
  g = 'gram',
  ml = 'milliliter',
  packer = 'packer'
}
