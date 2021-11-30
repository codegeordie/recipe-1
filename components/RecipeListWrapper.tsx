import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useGetRecipes } from '../hooks/useGetRecipes'
import {
	recipeArray as reduxRecipeArray,
	setRecipeArray,
	appendRecipeArray,
} from '../redux/slices/recipeListSlice'
import { SecondaryButton } from './Button'
import { RecipeList } from './RecipeList'
import { RecipeTable } from './RecipeTable'

export const RecipeListWrapper: React.FC = () => {
	const dispatch = useDispatch()
	const { getRecipes } = useGetRecipes()

	const [recipeView, setRecipeView] = useState<'list' | 'table'>('table')

	const recipeArray = useSelector(reduxRecipeArray)

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
		<>
			<StyledButtonWrapper>
				<SecondaryButton small onClick={() => setRecipeView('list')}>
					List View
				</SecondaryButton>
				<SecondaryButton small onClick={() => setRecipeView('table')}>
					Table View
				</SecondaryButton>
			</StyledButtonWrapper>
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

const StyledButtonWrapper = styled.div`
	padding: 5px;
	display: flex;
	justify-content: center;
`
