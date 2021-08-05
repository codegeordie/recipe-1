// import axios from 'axios'
// import qs from 'querystring'
import { Recipe } from '../server/interfaces'

export const useGetRecipesAll = () => {
	const getRecipesAll = async () => {
		// const search = qs.stringify(query)

		const data: Recipe[] = await fetch(
			`http://localhost:5001/api/recipes/all`
		).then(res => res.json())

		return data
	}

	return {
		getRecipesAll,
	}
}
