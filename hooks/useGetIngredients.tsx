import axios from 'axios'
import qs from 'querystring'
import { GetIngredientsQuery, Ingredient } from '../server/interfaces'


export const useGetIngredients = () => {
	const getIngredients = async (query:GetIngredientsQuery) => {
		const search = qs.stringify(query)
		const { data } = await axios.get<Ingredient[]>(
			`http://localhost:5000/?${search}`,
			{
				headers: {
					'getingredients': true
				}
			}
		)
		
		return data
	}

	return {
		getIngredients,
	}
}
