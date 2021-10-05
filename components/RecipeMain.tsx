import React from 'react'
import styled from 'styled-components'
import { Recipe } from '../server/interfaces'
//import { RecipeDetail } from './RecipeDetail'

export const RecipeMain: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
	return (
		<>
			<StyledRecipeGrid>
				{/* <RecipeDetail recipe={recipe} /> */}
				<StyledTitle>{recipe.label}</StyledTitle>
				<StyledImageWrapper>
					<img src={recipe.image}></img>
				</StyledImageWrapper>
				<StyledStatWrapper>
					<p>{`makes ${recipe.yield} servings`}</p>
					<p>{`${Math.round(recipe.serving_cal)}cal per serving`}</p>
				</StyledStatWrapper>
			</StyledRecipeGrid>
		</>
	)
}

const StyledRecipeGrid = styled.div`
	height: 100%;
	width: clamp(500px, 50vw, 90vw);
	margin-top: 25px;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	justify-items: stretch;
	/* grid-template: 
		'title title' auto
		'image image' auto
		'lstat rstat' auto / 1fr 1fr; */
`

const StyledTitle = styled.h2`
	text-align: center;
	font: 2rem ${p => p.theme.font.title};
	margin-bottom: 20px;
`

const StyledImageWrapper = styled.div`
	margin: 0 auto;
	object-fit: cover;
	margin-bottom: 20px;
`

const StyledStatWrapper = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: center;
	margin-bottom: 20px;
	p {
		flex: 1;
		text-align: center;
	}
`
