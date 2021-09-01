import axios from 'axios'
import { setFavoriteAction } from '../../redux/slices/recipeListSlice'
import { AppDispatch } from '../../redux/store'

type SetFavorite = { recipeId: string; setFavBool: boolean }

export const setFavorite = ({ recipeId, setFavBool }: SetFavorite) => async (
	dispatch: AppDispatch
) => {
	dispatch(setFavoriteAction({ recipeId, setFavBool }))

	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/users/favorites`,
		{ recipeId, setFavBool },
		{
			withCredentials: true,
		}
	)

	return response
}

// export const getFavorites = async (query: { id: string }) => {
// 	const search = qs.stringify(query)

// 	const response = await fetch(
// 		`${process.env.NEXT_PUBLIC_API_URL}/favorites/?${search}`,
// 		{
// 			credentials: 'include',
// 		}
// 	).then(res => res.json())

// 	if (response[0].favoritesFull) return response[0].favoritesFull
// 	else {
// 		console.log(
// 			'response not returned correctly from GetFavorites :>> ',
// 			response
// 		)
// 		return response
// 	}
// }

export const setCurrency = async ({ currency }: { currency: any }) => {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/users/currency`,
		{ currency },
		{
			withCredentials: true,
		}
	)

	return response
}

export const getCurrency = async () => {
	try {
		return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/currency`, {
			credentials: 'include',
		}).then(res => res.json())
	} catch (error) {
		//Somebugreporttool.report(error);
		throw error
	}
}
