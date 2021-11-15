import React, { memo } from 'react'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { RecipeListProps } from '../server/interfaces'

const RecipeRow = memo(({ recipe, lastElementRef }) => {
	return (
		<>
			<StyledTD key={recipe._id} ref={lastElementRef}>
				{recipe.label}
			</StyledTD>
			<StyledTD key={recipe._id}>{recipe.calories}</StyledTD>
			<StyledTD key={recipe._id}>{recipe.totalTime}</StyledTD>
		</>
	)
})

export const RecipeTable: React.FC<RecipeListProps> = ({
	recipes,
	listTitle,
	lastElementRef,
	lastElementId,
}) => {
	const recipesOutput = recipes.map((recipe, index, { length }) => {
		if (index === length - 1) {
			lastElementId.current = recipe._id
			return (
				<RecipeRow
					recipe={recipe}
					lastElementRef={lastElementRef}
					key={recipe._id}
				/>
				// <RecipeCard
				// 	key={listTitle + recipe._id}
				// 	recipe={recipe}
				// 	lastElementRef={lastElementRef}
				// />
			)
		} else {
			return <RecipeRow recipe={recipe} key={recipe._id} />
		}
	})

	// const Card = memo(
	// 	({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
	// 		const i = rowIndex * 4 + columnIndex
	// 		return (
	// 			<tr style={style} key={i}>
	// 				{recipesOutput[i]}
	// 			</tr>
	// 		)
	// 	}
	// )
	// Card.displayName = 'Card'

	const Row = ({ index, style }) => (
		<StyledTR
			//className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
			style={style}
		>
			{recipesOutput[index]}
		</StyledTR>
	)

	return (
		<>
			<StyledTableHeader>
				<div>Recipe</div>
				<div>Calories</div>
				<div>Cooktime</div>
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

// const StyledCardWrapper = styled.div`
// 	padding: 5px;
// `

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
