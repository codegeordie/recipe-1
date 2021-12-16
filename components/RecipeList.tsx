import React, { memo } from 'react'
import styled from 'styled-components'
import { FixedSizeGrid, GridChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { RecipeListProps } from '../server/interfaces'
import { RecipeCard } from './RecipeCard'
import { useDispatch, useSelector } from 'react-redux'
import {
	recipeListColumns,
	setRecipeListColumns,
} from '../redux/slices/recipeListSlice'

export const RecipeList: React.FC<RecipeListProps> = ({
	recipes,
	listTitle,
	lastElementRef,
	lastElementId,
	cardHeight,
}) => {
	const dispatch = useDispatch()

	const recipesOutput = recipes.map((recipe, index, { length }) => {
		if (index === length - 1) {
			lastElementId.current = recipe._id
			return (
				<RecipeCard
					key={listTitle + recipe._id}
					recipe={recipe}
					lastElementRef={lastElementRef}
				/>
			)
		} else {
			return <RecipeCard key={listTitle + recipe._id} recipe={recipe} />
		}
	})

	const Card = memo(
		({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
			const cols = useSelector(recipeListColumns) ?? 1
			const i = rowIndex * cols + columnIndex
			return (
				<StyledCardWrapper
					style={{
						...style,
						top: `${parseFloat(style.top) + 20}px`,
					}}
					key={i}
				>
					{recipesOutput[i]}
				</StyledCardWrapper>
			)
		}
	)
	Card.displayName = 'Card'

	return (
		<AutoSizer>
			{({ height, width }) => {
				let cols = 1
				if (width > 768) cols = 4
				else if (width > 420) cols = 2
				dispatch(setRecipeListColumns(cols))

				return (
					<FixedSizeGrid
						columnCount={cols}
						columnWidth={(width - 20) / cols}
						height={height}
						rowCount={recipes.length / cols + 1}
						rowHeight={cardHeight}
						width={width}
					>
						{Card}
					</FixedSizeGrid>
				)
			}}
		</AutoSizer>
	)
}

const StyledCardWrapper = styled.div`
	//padding: 5px;
	padding: 8px;
`

// const StyledRecipeList = styled.ul`
// 	position: relative;
// 	display: grid;
// 	grid-template-columns: 1fr;
// 	grid-auto-rows: clamp(250px, 30vw, 350px);
// 	gap: 10px;
// 	@media only screen and (min-width: 350px) {
// 		grid-template-columns: repeat(2, 1fr);
// 	}
// 	@media only screen and (min-width: 576px) {
// 		grid-template-columns: repeat(2, 1fr);
// 	}
// 	@media only screen and (min-width: 768px) {
// 		grid-template-columns: repeat(3, 1fr);
// 		gap: 15px;
// 	}
// 	@media only screen and (min-width: 992px) {
// 		grid-template-columns: repeat(4, 1fr);
// 		gap: 20px;
// 	}
// 	@media only screen and (min-width: 1200px) {
// 		grid-template-columns: repeat(5, 1fr);
// 	}
// `
