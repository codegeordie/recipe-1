import axios from 'axios'
import qs from 'querystring'
import { GetRecipesQuery, Recipe } from '../server/interfaces'

export const useGetRecipes = () => {
	const getRecipes = async (query: GetRecipesQuery) => {
		const search = qs.stringify(query)
		// const search = query ? qs.stringify('name' in query ? {
		// 	name: query.name
		// } : {
		// 	id: query.id
		// }): null;
		const { data } = await axios.get<Recipe[]>(
			`http://localhost:5000/?${search}`
		)

		return data
	}

	return {
		getRecipes,
	}
}
