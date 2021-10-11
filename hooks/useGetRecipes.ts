import { useRouter } from 'next/dist/client/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { createdBool, showFavorites } from '../redux/slices/recipesSlice'
import { userCurrencyPreference } from '../redux/slices/userSlice'
import axios from 'axios'

export const useGetRecipes = (): { getRecipes: typeof getRecipes } => {
	const router = useRouter()
	const showOnlyFavorites = useSelector(showFavorites)
	const showOnlyCreated = useSelector(createdBool)
	const currency = useSelector(userCurrencyPreference)

	type getRecipesProps = {
		cursor?: string
		limit?: number
	}

	const getRecipes = useCallback(
		({ cursor, limit }: getRecipesProps = {}) => {
			return axios({
				method: 'GET',
				url: `${process.env.NEXT_PUBLIC_API_URL}/recipes/`,
				withCredentials: true,
				params: {
					...router.query,
					showOnlyFavorites,
					currency: currency.id,
					cursor,
					limit,
				},
			}).then(res => res.data)
		},
		[router.query, showOnlyCreated, showOnlyFavorites, currency]
	)

	return {
		getRecipes,
	}
}