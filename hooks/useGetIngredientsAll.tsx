import { Ingredient } from '../server/interfaces'

export const useGetIngredientsAll = () => {
	const getIngredientsAll = async () => {
		const data: Ingredient[] = await fetch(
			`http://localhost:5001/api/ingredients/all/`
		).then(res => res.json())

		return data
	}

	return {
		getIngredientsAll,
	}
}
