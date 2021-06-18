import { RecipePopulated, QueryObject } from "./interfaces"
import axios from 'axios'

const parseQuery = (query:QueryObject) => {
	const obj = `type=${query.type}&terms=${query.terms.join('&terms=')}`
	return obj
}

export const getRecipes = async (queryObj:QueryObject) => {
	const search:string = parseQuery(queryObj)
	const queryServer = async (searchString:string) => {
		const res = await axios.get(`http://localhost:5000/?${searchString}`)
		return res.data
	}
	const recipesArray:RecipePopulated[] = await queryServer(search)
	return recipesArray
}
