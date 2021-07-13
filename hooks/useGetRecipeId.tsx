import axios from 'axios'
import qs from 'querystring'
import { GetRecipesQuery, Recipe } from '../server/interfaces'

export const useGetRecipeId = () => {
	const getRecipeId = async (query: { id: string }) => {
		const search = qs.stringify(query)

		const data: Recipe[] = await fetch(
			`http://localhost:5001/api/recipeid/?${search}`
		).then(res => res.json())

		return data
	}

	return {
		getRecipeId,
	}
}
