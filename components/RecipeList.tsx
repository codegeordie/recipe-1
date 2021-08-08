import React from 'react'
import styled from 'styled-components'
import { RArrayAsProps } from '../server/interfaces'
import { RecipeCard } from './RecipeCard'

export const RecipeList = ({ recipes, id }: RArrayAsProps) => {
	const recipesOutput = recipes.map(recipe => {
		return <RecipeCard key={id + recipe._id} recipe={recipe} />
	})

	return <StyledRecipeList>{recipesOutput}</StyledRecipeList>
}

const StyledRecipeList = styled.ul`
	position: relative;
	//padding: 0 10px;
	/* display: flex;
	flex-wrap: wrap;
	justify-content: center; */
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: clamp(100px, 35vw, 350px);
	gap: 10px;

	@media only screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media only screen and (min-width: 900px) {
		grid-template-columns: repeat(4, 1fr);
		gap: 15px;
	}
	/* @media only screen and (min-width: 1200px) {
		grid-template-columns: repeat(5, 1fr);
	} */
`
