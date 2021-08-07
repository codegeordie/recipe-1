import qs from 'querystring'
import axios from 'axios'
import {
	Recipe,
	GetRecipesQuery,
	RecipeSubmittal,
} from '../../server/interfaces'

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
		recipe
	)

	return response
}
