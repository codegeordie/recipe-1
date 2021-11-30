import { useRouter } from 'next/dist/client/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { createdBool, showFavorites } from '../redux/slices/recipesSlice'
import { userCurrencyPreference } from '../redux/slices/userSlice'
import {
	recipeSortField as reduxRecipeSortField,
	recipeSortDirection as reduxRecipeSortDirection,
} from '../redux/slices/recipeListSlice'

export const useGetRecipes = (): { getRecipes: typeof getRecipes } => {
	const router = useRouter()
	const showOnlyFavorites = useSelector(showFavorites)
	const showOnlyCreated = useSelector(createdBool)
	const currency = useSelector(userCurrencyPreference)
	const recipeSortField = useSelector(reduxRecipeSortField)
	const recipeSortDirection = useSelector(reduxRecipeSortDirection)

	type getRecipesProps = {
		cursor?: string
		limit?: number
		skipIn?: number
	}

	const getRecipes = useCallback(
		({ cursor, limit, skipIn }: getRecipesProps = {}) => {
			let recipeSort: any
			if (recipeSortField && recipeSortDirection) {
				if (recipeSortDirection === 'ascending') {
					recipeSort = { [recipeSortField]: 1 }
				} else if (recipeSortDirection === 'descending') {
					recipeSort = { [recipeSortField]: -1 }
				}
			} else {
				recipeSort = undefined
			}

			return axios({
				method: 'GET',
				url: `${process.env.NEXT_PUBLIC_API_URL}/recipes/`,
				withCredentials: true,
				params: {
					...router.query,
					showOnlyFavorites,
					currency: currency.id,
					recipeSort,
					cursor,
					limit,
					skip: skipIn,
				},
			}).then(res => res.data)
		},
		[
			router.query,
			showOnlyCreated,
			showOnlyFavorites,
			currency,
			recipeSortField,
			recipeSortDirection,
		]
	)

	return {
		getRecipes,
	}
}
