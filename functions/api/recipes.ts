import qs from 'querystring'
import axios from 'axios'
import {
	Recipe,
	GetRecipesQuery,
	RecipeSubmittal,
} from '../../server/interfaces'
import { ObjectId } from 'mongodb'

export const getRecipes = async (query?: GetRecipesQuery) => {
	const search = qs.stringify(query)

	const response: Recipe[] = await fetch(
		`http://localhost:5001/api/recipes/?${search}`,
		{
			credentials: 'include',
		}
	).then(res => res.json())

	return response
}

export const getRecipesAll = async () => {
	const response: Recipe[] = await fetch(
		`http://localhost:5001/api/recipes/all`,
		{
			credentials: 'include',
		}
	).then(res => res.json())

	return response
}

export const getRecipeById = async (recipeId: string) => {
	const response: Recipe[] = await fetch(
		`http://localhost:5001/api/recipes/id/${recipeId}`,
		{
			credentials: 'include',
		}
	).then(res => res.json())

	return response
}

export const submitRecipe = async (recipe: RecipeSubmittal) => {
	const response = await axios.post(
		`http://localhost:5001/api/recipes/`,
		recipe,
		{ withCredentials: true }
	)

	return response
}

type RecipeUpdate = {
	recipeId: string
	recipe: RecipeSubmittal
}

export const updateRecipe = async ({ recipeId, recipe }: RecipeUpdate) => {
	const response = await axios.put(
		`http://localhost:5001/api/recipes/id/${recipeId}`,
		recipe,
		{ withCredentials: true }
	)

	return response
}

export const deleteRecipe = async (recipeId: string) => {
	const response = await axios.delete(
		`http://localhost:5001/api/recipes/id/${recipeId}`,
		{ withCredentials: true }
	)

	return response
}
