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
import Dinero from 'dinero.js'
import { ChevronDown, ChevronUp } from '@air/icons'

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
				{Math.round(recipe.serving_cal)}
			</StyledTD>
			<StyledTD key={'cost' + recipe._id} flexWidth={1}>
				{Dinero({
					amount: Math.round(recipe.cost.value / recipe.yield),
					currency: recipe.cost.currency,
				}).toFormat('$0,0.00')}
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
				{recipeSortField !== sortLabel && (
					<ChevronUp width='25' fill='transparent' />
				)}
				{recipeSortField === sortLabel &&
					(recipeSortDirection === 'ascending' ? (
						<ChevronUp width='25' fill='#0fb3a2' />
					) : (
						<ChevronDown width='25' fill='#0fb3a2' />
					))}
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
					<TableHeaderButton sortLabel='cost'>Cost</TableHeaderButton>
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
						style={{ display: 'block' }}
					>
						{Row}
					</FixedSizeList>
				)}
			</AutoSizer>
		</>
	)
}

const StyledTR = styled.tr`
	display: flex;
	flex-direction: row;
	&.rowOdd {
		background: rgba(0, 0, 0, 0.06);
	}
`

const StyledTD = styled.td<{ flexWidth: number }>`
	flex: ${p => p.flexWidth};
	display: flex;
	min-width: 0;
	align-items: center;
	padding: 5px;
	font: 1.2rem ${p => p.theme.font.title};
	border-right: thin solid rgba(0, 0, 0, 0.2);
	&:last-child {
		border-right: none;
	}
	@media (min-width: 576px) {
		font: 1.3rem ${p => p.theme.font.title};
	}
`

const StyledTableImage = styled.div`
	overflow: hidden;
	aspect-ratio: 3/2;
	width: 44px;
	min-width: 66px;
	margin-right: 10px;
	border-radius: 3px;
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
	display: flex;
	flex-direction: row;
	height: 4rem;
	overflow-y: scroll;
`

const StyledHeaderCell = styled.div<{ flexWidth: number }>`
	flex: ${p => p.flexWidth};
	display: flex;
	align-items: center;
	padding: 0.5rem;
	font: 1.5rem ${p => p.theme.font.title};
	border-bottom: thin solid rgba(0, 0, 0, 0.5);
`

const StyledSortButton = styled.button<{ sortSelected: boolean }>`
	outline: none;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	cursor: pointer;
	background-color: ${p => p.theme.color.gamma};
	color: ${p =>
		p.sortSelected ? [p.theme.color.delta] : [p.theme.text.dark09]};
	&:hover {
		text-decoration: underline;
	}
`
