import qs from 'querystring'
import { Ingredient } from '../server/interfaces'

export const useGetIngredients = () => {
	const getIngredients = async (query: { name: string }) => {
		const search = qs.stringify(query)

		const data: Ingredient[] = await fetch(
			`http://localhost:5001/api/ingredients_by_name/?${search}`
		).then(res => res.json())

		return data
	}

	return {
		getIngredients,
	}
}
