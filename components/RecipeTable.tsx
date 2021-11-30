import React, { memo } from 'react'
import styled from 'styled-components'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useDispatch, useSelector } from 'react-redux'
import {
	recipeSortField as reduxRecipeSortField,
	setRecipeSortField,
	recipeSortDirection as reduxRecipeSortDirection,
	setRecipeSortDirection,
} from '../redux/slices/recipeListSlice'
import { Recipe, RecipeTableProps } from '../server/interfaces'
import _ from 'lodash'
import Router from 'next/router'
import { transparentize } from 'polished'

type RecipeRow = {
	recipe: Recipe
	lastElementRef?: (element: HTMLTableCellElement) => void
}

const RecipeRow = memo(({ recipe, lastElementRef }: RecipeRow) => {
	const pushWithQuery = () => {
		Router.push({ pathname: `/r/${recipe._id}/`, query: { ...Router.query } })
	}

	return (
		<>
			<StyledTD key={'label' + recipe._id} ref={lastElementRef} flexWidth={3}>
				<StyledTableImage>
					<img src={recipe.image} />
				</StyledTableImage>
				<StyledRecipeLabelButton onClick={pushWithQuery}>
					{recipe.label}
				</StyledRecipeLabelButton>
			</StyledTD>
			<StyledTD key={'cals' + recipe._id} flexWidth={1}>
				{Math.round(recipe.calories)}
			</StyledTD>
			<StyledTD key={'time' + recipe._id} flexWidth={1}>
				{recipe.totalTime}
			</StyledTD>
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
		if (index === length - 5) {
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
		<StyledTR className={index % 2 ? 'rowOdd' : 'rowEven'} style={style}>
			{recipesOutput[index]}
		</StyledTR>
	)

	type HeaderButton = {
		sortLabel: string
		children?: React.ReactNode
	}
	const TableHeaderButton = memo(({ sortLabel, children }: HeaderButton) => {
		const recipeSortField = useSelector(reduxRecipeSortField)
		const recipeSortDirection = useSelector(reduxRecipeSortDirection)

		const sortFunction = () => {
			if (_.isEqual(recipeSortField, sortLabel)) {
				if (recipeSortDirection === 'descending') {
					dispatch(setRecipeSortField(undefined))
					dispatch(setRecipeSortDirection(undefined))
				} else {
					dispatch(setRecipeSortDirection('descending'))
				}
			} else {
				dispatch(setRecipeSortField(sortLabel))
				dispatch(setRecipeSortDirection('ascending'))
			}
		}

		return (
			<StyledSortButton
				onClick={sortFunction}
				sortSelected={recipeSortField === sortLabel}
			>
				{children}
				{recipeSortField === sortLabel &&
					(recipeSortDirection === 'ascending' ? '⬆️' : '⬇️')}
			</StyledSortButton>
		)
	})
	TableHeaderButton.displayName = 'HeaderButton'

	return (
		<>
			<StyledTableHeader>
				<StyledHeaderCell flexWidth={3}>
					<TableHeaderButton sortLabel='label'>Recipe</TableHeaderButton>
				</StyledHeaderCell>
				<StyledHeaderCell flexWidth={1}>
					<TableHeaderButton sortLabel='calories'>Calories</TableHeaderButton>
				</StyledHeaderCell>
				<StyledHeaderCell flexWidth={1}>
					<TableHeaderButton sortLabel='totalTime'>Cooktime</TableHeaderButton>
				</StyledHeaderCell>
			</StyledTableHeader>
			<AutoSizer>
				{({ height, width }) => (
					<FixedSizeList
						height={height}
						width={width}
						itemCount={recipes.length}
						itemSize={50}
						outerElementType='table'
						innerElementType='tbody'
						style={{
							display: 'block',
							//borderTop: '1px solid black',
							//borderLeft: '1px solid black',
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
	//border-bottom: 1px solid black;
	display: flex;
	flex-direction: row;

	&.rowOdd {
		background: rgba(0, 0, 0, 0.1);
	}
`

const StyledTD = styled.td<{ flexWidth: number }>`
	flex: ${p => p.flexWidth};
	display: flex;
	min-width: 0;
	align-items: center;
	padding: 5px;
	font: 1.3rem ${p => p.theme.font.title};
	border-right: 1px solid rgba(0, 0, 0, 0.2);
	&:last-child {
		border-right: none;
	}
`

const StyledTableImage = styled.div`
	overflow: hidden;
	aspect-ratio: 1/1;
	width: 44px;
	min-width: 44px;
	margin-right: 10px;
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
`

const StyledRecipeLabelButton = styled.button`
	all: unset;
	cursor: pointer;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	max-width: 100%;
	&:hover {
		text-decoration: underline;
	}
`

const StyledTableHeader = styled.div`
	//border-bottom: 1px solid black;
	display: flex;
	flex-direction: row;
	height: 40px;
	overflow-y: scroll;
`

const StyledHeaderCell = styled.div<{ flexWidth: number }>`
	flex: ${p => p.flexWidth};
	display: flex;
	align-items: center;
	padding: 5px;
	//justify-content: center;
	font: 1.5rem ${p => p.theme.font.title};
	border-bottom: 1px solid grey;
`

const StyledSortButton = styled.button<{ sortSelected: boolean }>`
	outline: none;
	border: none;
	display: block;
	height: 100%;
	width: 100%;
	cursor: pointer;
	/* background-color: ${p =>
		p.sortSelected
			? [transparentize(0.5, p.theme.color.delta)]
			: [p.theme.color.gamma]}; */
	background-color: ${p => p.theme.color.gamma};
	border: 1px solid
		${p => (p.sortSelected ? [p.theme.color.delta] : 'transparent')};
	&:hover {
		text-decoration: underline;
	}
`
