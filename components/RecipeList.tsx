import React, { memo } from 'react'
import styled from 'styled-components'
import { RecipeListProps } from '../server/interfaces'
import { RecipeCard } from './RecipeCard'

import { FixedSizeGrid, GridChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

// export const RecipeList2: React.FC<RArrayAsProps> = ({
// 	recipes,
// 	id,
// 	lastElementRef,
// 	lastElementId,
// }) => {
// 	const recipesOutput = recipes.map((recipe, index, { length }) => {
// 		if (index === length - 1) {
// 			lastElementId.current = recipe._id
// 			return (
// 				<RecipeCard
// 					key={id + recipe._id}
// 					recipe={recipe}
// 					lastElementRef={lastElementRef}
// 				/>
// 			)
// 		} else {
// 			return <RecipeCard key={id + recipe._id} recipe={recipe} />
// 		}
// 	})

// 	return <StyledRecipeList>{recipesOutput}</StyledRecipeList>
// }
/////////////////////////////

export const RecipeList: React.FC<RecipeListProps> = ({
	recipes,
	id,
	lastElementRef,
	lastElementId,
	cardHeight,
}) => {
	const recipesOutput = recipes.map((recipe, index, { length }) => {
		if (index === length - 1) {
			lastElementId.current = recipe._id
			return (
				<RecipeCard
					key={id + recipe._id}
					recipe={recipe}
					lastElementRef={lastElementRef}
				/>
			)
		} else {
			return <RecipeCard key={id + recipe._id} recipe={recipe} />
		}
	})

	const Card = memo(
		({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
			const i = rowIndex * 4 + columnIndex
			return (
				<StyledCardWrapper style={style} key={i}>
					{recipesOutput[i]}
				</StyledCardWrapper>
			)
		}
	)
	Card.displayName = 'Card'

	return (
		<AutoSizer>
			{({ height, width }) => (
				<FixedSizeGrid
					columnCount={4}
					columnWidth={(width - 20) / 4}
					height={height}
					rowCount={recipes.length / 4 + 1}
					rowHeight={cardHeight}
					width={width}
				>
					{Card}
				</FixedSizeGrid>
			)}
		</AutoSizer>
	)
}

const StyledCardWrapper = styled.div`
	padding: 5px;
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
