import qs from 'querystring'
import { Ingredient } from '../../server/interfaces'

export const getIngredients = async (query: { name: string }) => {
	const search = qs.stringify(query)

	const response: Ingredient[] = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/ingredients/?${search}`
	).then(res => res.json())

	return response
}

export const getIngredientsAll = async () => {
	const response: Ingredient[] = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/ingredients/all/`
	).then(res => res.json())

	return response
}
