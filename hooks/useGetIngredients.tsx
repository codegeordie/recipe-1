import qs from 'querystring'
import { GetIngredientsQuery, Ingredient } from '../server/interfaces'

export const useGetIngredients = () => {
	const getIngredients = async (query: GetIngredientsQuery) => {
		const search = qs.stringify(query)

		const data: Ingredient[] = await fetch(
			`http://localhost:5001/api/ingredients/?${search}`
		).then(res => res.json())

		return data
	}

	return {
		getIngredients,
	}
}
