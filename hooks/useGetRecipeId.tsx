import { GetRecipesQuery, Recipe } from '../server/interfaces'

export const useGetRecipeId = () => {
	const getRecipeId = async ({ recipeId }: { recipeId: string }) => {
		const data: Recipe[] = await fetch(
			`http://localhost:5001/api/recipes/id/${recipeId}`
		).then(res => res.json())

		return data
	}

	return {
		getRecipeId,
	}
}
