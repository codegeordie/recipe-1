import axios from 'axios'
import qs from 'querystring'
import { Ingredient } from '../server/interfaces'


export const useGetIngredients = () => {
	const getIngredients = async (query: { ingr_rec: string }) => {
		const search = qs.stringify(query)
		const { data } = await axios.get<Ingredient[]>(
			`http://localhost:5000/?${search}`,
			{
				headers: {
					'my-test-header': false,
				},
			}
		)

		return data
	}

	return {
		getIngredients,
	}
}
