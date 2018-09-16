import { Service } from './base'
import {IngredientType, Recipe} from './model'

export const recipeService = new Service<Recipe>('recipes')
export const ingredientTypeService = new Service<IngredientType>('ingredientTypes')
