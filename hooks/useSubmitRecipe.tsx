import axios from 'axios'
import { RecipeSubmittal } from '../server/interfaces'

export const useSubmitRecipe = () => {
	const submitRecipe = async (recipe: RecipeSubmittal) => {
		let res = await axios.post(`http://localhost:5000/`, recipe)
	}

	return {
		submitRecipe,
	}
}
