import React from 'react'
import styled from 'styled-components'
import { RArrayAsProps } from '../server/interfaces'
import { RecipeCard } from './RecipeCard'

export const RecipeList = ({ recipesToRender }: RArrayAsProps) => {
	const recipes = recipesToRender.map(recipe => {
		return <RecipeCard key={recipe._id} recipe={recipe} />
	})

	return <StyledRecipeList>{recipes}</StyledRecipeList>
}

const StyledRecipeList = styled.ul`
	position: relative;
	padding: 1rem;
	max-width: 1200px;
	display: flex;
	flex-wrap: wrap;
	flex: 1;
	justify-content: center;
	align-content: flex-start;
`
