import axios from 'axios'
import qs from 'querystring'

export const setFavorite = async ({ uid, recipeId }) => {
	const response = await axios.post(`http://localhost:5001/api/favorites`, {
		uid,
		recipeId,
	})

	return response
}

export const getFavorites = async (query: { id: string }) => {
	const search = qs.stringify(query)

	const response = await fetch(
		`http://localhost:5001/api/favorites/?${search}`,
		{
			credentials: 'include',
		}
	).then(res => res.json())

	if (response[0].favoritesFull) return response[0].favoritesFull
	else {
		console.log(
			'response not returned correctly from GetFavorites :>> ',
			response
		)
		return response
	}
}
