import qs from 'querystring'
import axios from 'axios'
import {
	Recipe,
	GetRecipesQuery,
	RecipeSubmittal,
} from '../../server/interfaces'

export const getRecipes = (query?: GetRecipesQuery) => {
	const search = qs.stringify(query)

	return fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/?${search}`, {
		credentials: 'include',
	}).then(res => res.json())
}

export const getRecipesAll = () =>
	fetch(`${process.env.NEXT_PUBLIC_API_URL_DIRECT}/recipes/all`, {
		credentials: 'include',
	}).then(res => res.json())

//:Recipe[]
export const getRecipeById = (recipeId: string) =>
	fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/id/${recipeId}`, {
		credentials: 'include',
	}).then(res => res.json())

export const submitRecipe = (recipe: RecipeSubmittal) =>
	axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`, recipe, {
		withCredentials: true,
	})

//////////////
type RecipeUpdate = {
	recipeId: string
	recipe: RecipeSubmittal
}
export const updateRecipe = ({ recipeId, recipe }: RecipeUpdate) =>
	axios.put(
		`${process.env.NEXT_PUBLIC_API_URL}/recipes/id/${recipeId}`,
		recipe,
		{
			withCredentials: true,
		}
	)
///////////////

export const deleteRecipe = (recipeId: string) =>
	axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/recipes/id/${recipeId}`, {
		withCredentials: true,
	})
