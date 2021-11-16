import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetRecipes } from '../hooks/useGetRecipes'
import {
	recipeArray as reduxRecipeArray,
	setRecipeArray,
	appendRecipeArray,
} from '../redux/slices/recipeListSlice'
import { RecipeList } from './RecipeList'
import { RecipeTable } from './RecipeTable'

export const RecipeListWrapper: React.FC = () => {
	const dispatch = useDispatch()
	const { getRecipes } = useGetRecipes()

	const [recipeView, setRecipeView] = useState<'list' | 'table'>('table')

	const recipeArray = useSelector(reduxRecipeArray)

	let cursor: string | undefined
	let hasMoreResults = false
	const limit: number | undefined = 20

	useEffect(() => {
		const awaitGetRecipes = async () => {
			const { data, hasMore } = await getRecipes({ limit })
			dispatch(setRecipeArray(data))
			hasMoreResults = hasMore
		}
		awaitGetRecipes()
	}, [getRecipes])
	// }, [router.query, showOnlyCreated, showOnlyFavorites, currency, getRecipes])

	const observer = useRef<IntersectionObserver>()
	const lastElementId = useRef<string>()
	const lastElementRef = useCallback(
		(element: HTMLElement) => {
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMoreResults) {
					cursor = lastElementId.current
					const awaitGetRecipes = async () => {
						const { data } = await getRecipes({ cursor, limit })
						dispatch(appendRecipeArray(data))
					}

					awaitGetRecipes()
				}
			})
			if (element) observer.current.observe(element)
		},
		[getRecipes]
	)

	return (
		<>
			{recipeArray && recipeView === 'list' && (
				<RecipeList
					listTitle='rlist'
					recipes={recipeArray}
					lastElementRef={lastElementRef}
					lastElementId={lastElementId}
					cardHeight={300}
				/>
			)}
			{recipeArray && recipeView === 'table' && (
				<RecipeTable
					tableTitle='rtable'
					recipes={recipeArray}
					lastElementRef={lastElementRef}
					lastElementId={lastElementId}
				/>
			)}
		</>
	)
}
