import React from 'react'
import styled from 'styled-components'
import { RecipeListProps } from '../server/interfaces';
import { RecipeCard } from './RecipeCard'

const StyledRecipeList = styled.ul`
	position: relative;
	padding: 1rem;
	max-width: 1200px;
	display: flex;
	flex-wrap: wrap;
 	flex: 1;
	justify-content: center;
	align-content: flex-start;
	&:before {
		content : "";
  		position: absolute;
  		left: 20%;
  		top: 0;
		width: 60%;
	}
`;

export const RecipeList = ({ recipesToRender }:RecipeListProps) => {
	const recipes = recipesToRender.map((recipe) => {
		return <RecipeCard key={recipe.id} recipeData={recipe}/>
	})

	return (
		<StyledRecipeList>
			{recipes}
		</StyledRecipeList>
	)
}

