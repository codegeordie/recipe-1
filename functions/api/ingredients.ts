import qs from 'querystring'
import { Ingredient } from '../../server/interfaces'

export const getIngredients = async (query: { name: string }) => {
	const search = qs.stringify(query)

	const response: Ingredient[] = await fetch(
		`http://localhost:5001/api/ingredients/?${search}`
	).then(res => res.json())

	return response
}

export const getIngredientsAll = async () => {
	const response: Ingredient[] = await fetch(
		`http://localhost:5001/api/ingredients/all/`
	).then(res => res.json())

	return response
}
