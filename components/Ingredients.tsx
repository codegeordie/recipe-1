import React from 'react'
import styled from 'styled-components'
import { IngredientsProps } from '../server/interfaces';

const StyledIngredients = styled.table`
	color: grey;
	border-collapse: collapse;
	width: 100%;
`;

const IngredientItem = styled.tr`
	border: 1px solid black;
`;

const StyledTh = styled.th`
	padding: 0.5rem;
`;

const StyledTd = styled.td<{ isName?: boolean }>`
	padding: 0.5rem;
	text-align: ${props => props.isName ? "left" : "center"};
`;

export const Ingredients = ({ingrArray}:IngredientsProps) => {
	const ingredientTable = ingrArray.map((ingredient) => {
		return (
			<IngredientItem key={ingredient.id}>
				<StyledTd isName>{ingredient.name}</StyledTd>
				<StyledTd>{ingredient.quantity}</StyledTd>
				<StyledTd>{ingredient.cost.value}</StyledTd>
			</IngredientItem>
		)
	})

	return (
		<StyledIngredients>
			<thead>
				<tr>
					<StyledTh>Ingredient</StyledTh>
					<StyledTh>Quantity</StyledTh>
					<StyledTh>Cost</StyledTh>
				</tr>
			</thead>
			<tbody>
				{ingredientTable}
			</tbody>
		</StyledIngredients>
	)
}

