import React, { memo, ReactChild, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useDispatch, useSelector } from 'react-redux'
import {
	recipeSort as reduxRecipeSort,
	setRecipeSort,
} from '../redux/slices/recipeListSlice'
import { Recipe, RecipeTableProps } from '../server/interfaces'
import { useMount } from 'react-use'
import _ from 'lodash'

type RecipeRow = {
	recipe: Recipe
	lastElementRef?: (element: HTMLTableCellElement) => void
}

const RecipeRow = memo(({ recipe, lastElementRef }: RecipeRow) => {
	return (
		<>
			<StyledTD key={'label' + recipe._id} ref={lastElementRef}>
				{recipe.label}
			</StyledTD>
			<StyledTD key={'cals' + recipe._id}>
				{Math.round(recipe.calories)}
			</StyledTD>
			<StyledTD key={'time' + recipe._id}>{recipe.totalTime}</StyledTD>
		</>
	)
})
RecipeRow.displayName = 'RecipeRow'

export const RecipeTable: React.FC<RecipeTableProps> = ({
	recipes,
	tableTitle,
	lastElementRef,
	lastElementId,
}) => {
	const dispatch = useDispatch()

	const recipesOutput = recipes.map((recipe, index, { length }) => {
		if (index === length - 1) {
			lastElementId.current = recipe._id
			return (
				<RecipeRow
					recipe={recipe}
					lastElementRef={lastElementRef}
					key={tableTitle + recipe._id}
				/>
			)
		} else {
			return <RecipeRow recipe={recipe} key={tableTitle + recipe._id} />
		}
	})

	const Row = ({ index, style }: ListChildComponentProps) => (
		<StyledTR
			//className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
			style={style}
		>
			{recipesOutput[index]}
		</StyledTR>
	)

	type HeaderButton = {
		sortLabel: string
		children?: React.ReactNode
	}
	const HeaderButton = memo(({ sortLabel, children }: HeaderButton) => {
		const recipeSort = useSelector(reduxRecipeSort)

		const sortFunction = () => {
			if (_.isEqual(recipeSort, { [sortLabel]: 1 })) {
				dispatch(setRecipeSort({ [sortLabel]: -1 }))
			} else if (_.isEqual(recipeSort, { [sortLabel]: -1 })) {
				dispatch(setRecipeSort(undefined))
			} else {
				dispatch(setRecipeSort({ [sortLabel]: 1 }))
			}
		}

		return <button onClick={sortFunction}>{children}</button>
	})
	HeaderButton.displayName = 'HeaderButton'

	return (
		<>
			<StyledTableHeader>
				<div>
					<HeaderButton sortLabel='label'>Recipe</HeaderButton>
				</div>
				<div>
					<HeaderButton sortLabel='calories'>Calories</HeaderButton>
				</div>
				<div>
					<HeaderButton sortLabel='totalTime'>Cooktime</HeaderButton>
				</div>
			</StyledTableHeader>
			<AutoSizer>
				{({ height, width }) => (
					<FixedSizeList
						height={height}
						width={width}
						itemCount={recipes.length}
						itemSize={40}
						outerElementType='table'
						innerElementType='tbody'
						style={{
							display: 'block',
							borderTop: '1px solid black',
							borderLeft: '1px solid black',
							//borderCollapse: 'collapse',
						}}
					>
						{Row}
					</FixedSizeList>
				)}
			</AutoSizer>
		</>
	)
}

const StyledTR = styled.tr`
	border-bottom: 1px solid black;
	display: flex;
	flex-direction: row;
`

const StyledTD = styled.td`
	border-right: 1px solid black;
	display: block;
	flex: 1;
`

const StyledTableHeader = styled.div`
	border-bottom: 1px solid black;
	display: flex;
	flex-direction: row;
	height: 40px;
	div {
		flex: 1;
		display: flex;
		align-items: center;
		//justify-content: center;
		font: 1.5rem ${p => p.theme.font.title};
	}
`
