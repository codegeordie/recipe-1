import axios from "axios";


export const useSubmitRecipe = () => {
	const submitRecipe = async recipe => {
		let res = await axios.post(`http://localhost:5000/`, recipe)
	}

	return {
		submitRecipe
	}
}
