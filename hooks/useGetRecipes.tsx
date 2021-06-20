import axios from "axios"
import { QueryObject, RecipePopulated } from "../server/interfaces"
import { Ingredient } from "../server/interfaces"

export const useGetRecipes = () => {
	const getRecipes = async (query:QueryObject) => {
		const search:string = `type=${query.type}&terms=${query.terms.join('&terms=')}`
		const { data } = await axios.get<RecipePopulated[]>(`http://localhost:5000/?${search}`)

			return data
  }

	return {
		getRecipes
	}
}



export const useGetIngredients = () => {
	const getIngredients = async (query:QueryObject) => {
		const search:string = `type=${query.type}&terms=${query.terms.join('&terms=')}`
		const { data } = await axios.get<Ingredient[]>(`http://localhost:5000/?${search}`)

			return data
  }

	return {
		getIngredients
	}
}
