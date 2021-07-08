import axios from 'axios'
import qs from 'querystring'
import { GetRecipesQuery, Recipe } from '../server/interfaces'

export const useGetRecipes = () => {
	const getRecipes = async (query: GetRecipesQuery) => {
		const search = qs.stringify(query)

		const data: Recipe[] = await fetch(
			`http://localhost:5001/api/recipes/?${search}`
		).then(res => res.json())

		return data
	}

	return {
		getRecipes,
	}
}
