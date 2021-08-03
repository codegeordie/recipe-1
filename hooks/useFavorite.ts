import axios from 'axios'
import qs from 'querystring'

export const useSetFavorite = () => {
	const setFavorite = async ({ uid, recipeId }) => {
		const dbRes = await axios.post(`http://localhost:5001/api/favorites`, {
			uid,
			recipeId,
		})
	}

	return {
		setFavorite,
	}
}

export const useGetFavorites = () => {
	const getFavorites = async (query: { id: string }) => {
		const search = qs.stringify(query)

		console.log('search(in useFavorite) :>> ', search)

		const data = await fetch(`http://localhost:5001/api/favorites/?${search}`, {
			credentials: 'include',
		}).then(res => res.json())

		console.log('data :>> ', data)

		return data
	}

	return {
		getFavorites,
	}
}
