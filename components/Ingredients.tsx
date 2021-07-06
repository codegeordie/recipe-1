import React from 'react'
import styled from 'styled-components'
import { IngredientsProps } from '../server/interfaces'

export const Ingredients = ({ ingrArray, ingrRec }: IngredientsProps) => {
	console.log('ingrArray :>> ', ingrArray)
	console.log('ingrRec :>> ', ingrRec)
	const ingredientTable = ingrArray.map(ingredient => {
		let iQuantity, iCost
		ingrRec?.forEach(i => {
			if (i.ingredient_id === ingredient._id) {
				iQuantity = i.quantity
				iCost = (ingredient.cost.value / ingredient.quantity) * iQuantity
			}
		})
		return (
			<IngredientItem key={ingredient._id}>
				<StyledTd isName>{ingredient.name}</StyledTd>
				<StyledTd>{iQuantity}</StyledTd>
				<StyledTd>{iCost}</StyledTd>
			</IngredientItem>
		)
	})

	return (
		<StyledIngredients>
			<thead>
				<tr>
					<StyledTh isName>Ingredient</StyledTh>
					<StyledTh>Quantity</StyledTh>
					<StyledTh>Cost</StyledTh>
				</tr>
			</thead>
			<tbody>{ingredientTable}</tbody>
		</StyledIngredients>
	)
}

const StyledIngredients = styled.table`
	color: ${p => p.theme.text.dark07};
	border-collapse: collapse;
	width: clamp(40rem, 50%, 60rem);
	max-width: 90vw;
`

const IngredientItem = styled.tr`
	border-bottom: 1px solid rgba(125, 125, 125, 0.2);
`

const StyledTh = styled.th<{ isName?: boolean }>`
	padding: 1rem 1.5rem;
	border-bottom: 1px solid ${p => p.theme.color.delta};
	text-align: ${props => (props.isName ? 'left' : 'center')};
	font: 200 1.8rem ${p => p.theme.font.title};
`

const StyledTd = styled.td<{ isName?: boolean }>`
	padding: 0.5rem 1.5rem;
	text-align: ${props => (props.isName ? 'left' : 'center')};
	font: 400 1.6rem ${p => p.theme.font.title};
`
