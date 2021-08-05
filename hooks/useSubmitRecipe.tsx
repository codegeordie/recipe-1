import axios from 'axios'
import { RecipeSubmittal } from '../server/interfaces'

export const useSubmitRecipe = () => {
	const submitRecipe = async (recipe: RecipeSubmittal) => {
		const dbRes = await axios.post(`http://localhost:5001/api/recipes/`, recipe)
	}

	return {
		submitRecipe,
	}
}
