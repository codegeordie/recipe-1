import qs from 'querystring'
import axios from 'axios'
import {
	Recipe,
	GetRecipesQuery,
	RecipeSubmittal,
} from '../../server/interfaces'

export const getRecipes = (query?: GetRecipesQuery) => {
	const search = qs.stringify(query)

	return fetch(`http://localhost:5001/api/recipes/?${search}`, {
		credentials: 'include',
	}).then(res => res.json())
}

export const getRecipesAll = () =>
	fetch(`http://localhost:5001/api/recipes/all`, {
		credentials: 'include',
	}).then(res => res.json())

//:Recipe[]
export const getRecipeById = (recipeId: string) =>
	fetch(`http://localhost:5001/api/recipes/id/${recipeId}`, {
		credentials: 'include',
	}).then(res => res.json())

export const submitRecipe = (recipe: RecipeSubmittal) =>
	axios.post(`http://localhost:5001/api/recipes/`, recipe, {
		withCredentials: true,
	})

//////////////
type RecipeUpdate = {
	recipeId: string
	recipe: RecipeSubmittal
}
export const updateRecipe = ({ recipeId, recipe }: RecipeUpdate) =>
	axios.put(`http://localhost:5001/api/recipes/id/${recipeId}`, recipe, {
		withCredentials: true,
	})
///////////////

export const deleteRecipe = (recipeId: string) =>
	axios.delete(`http://localhost:5001/api/recipes/id/${recipeId}`, {
		withCredentials: true,
	})
