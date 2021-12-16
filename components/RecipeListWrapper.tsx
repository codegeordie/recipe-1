import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useGetRecipes } from '../hooks/useGetRecipes'
import {
	recipeArray as reduxRecipeArray,
	setRecipeArray,
	appendRecipeArray,
	recipeListView as reduxRecipeListView,
} from '../redux/slices/recipeListSlice'
import { RecipeList } from './RecipeList'
import { RecipeTable } from './RecipeTable'

export const RecipeListWrapper: React.FC = () => {
	const dispatch = useDispatch()
	const { getRecipes } = useGetRecipes()

	const recipeArray = useSelector(reduxRecipeArray)
	const recipeListView = useSelector(reduxRecipeListView)

	let cursor: string | undefined
	let hasMoreResults = false
	const limit: number | undefined = 100
	let skipIn: number | undefined

	useEffect(() => {
		const awaitGetRecipes = async () => {
			const { data, hasMore, skip } = await getRecipes({ limit })
			dispatch(setRecipeArray(data))
			hasMoreResults = hasMore
			skipIn = skip ?? 0
		}
		awaitGetRecipes()
	}, [getRecipes])

	const observer = useRef<IntersectionObserver>()
	const lastElementId = useRef<string>()
	const lastElementRef = useCallback(
		(element: HTMLElement) => {
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMoreResults) {
					cursor = lastElementId.current
					const awaitGetRecipes = async () => {
						const { data, skip, hasMore } = await getRecipes({
							cursor,
							limit,
							skipIn,
						})
						dispatch(appendRecipeArray(data))
						hasMoreResults = hasMore
						skipIn = skip ?? undefined
					}

					awaitGetRecipes()
				}
			})
			if (element) observer.current.observe(element)
		},
		[getRecipes]
	)

	return (
		<StyledRecipeListWrapper>
			{recipeArray && recipeListView === 'card' && (
				<RecipeList
					listTitle='rlist'
					recipes={recipeArray}
					lastElementRef={lastElementRef}
					lastElementId={lastElementId}
					cardHeight={280}
				/>
			)}
			{recipeArray && recipeListView === 'table' && (
				<RecipeTable
					tableTitle='rtable'
					recipes={recipeArray}
					lastElementRef={lastElementRef}
					lastElementId={lastElementId}
				/>
			)}
		</StyledRecipeListWrapper>
	)
}

const StyledRecipeListWrapper = styled.div`
	padding-left: 2rem;
	height: 100%;
	width: 100%;
	background-color: ${p => p.theme.color.gamma};
`
