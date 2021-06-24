import React from 'react'
import styled from 'styled-components'
import { IngredientsProps } from '../server/interfaces';


export const Ingredients = ({ingrArray}:IngredientsProps) => {
	const ingredientTable = ingrArray.map((ingredient) => {
		return (
			<IngredientItem key={ingredient._id}>
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


const StyledIngredients = styled.table`
	color: rgba(25,25,25,1);
	border-collapse: collapse;
	width: 100%;
	max-width: 80vw;
`;

const IngredientItem = styled.tr`
	border: 1px solid rgba(125,125,125,.5);
`;

const StyledTh = styled.th`
	padding: 0.5rem;
`;

const StyledTd = styled.td<{ isName?: boolean }>`
	padding: 0.5rem;
	text-align: ${props => props.isName ? "left" : "center"};
`;
