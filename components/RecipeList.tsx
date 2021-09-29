import React from 'react'
import styled from 'styled-components'
import { RArrayAsProps } from '../server/interfaces'
import { RecipeCard } from './RecipeCard'

export const RecipeList: React.FC<RArrayAsProps> = ({
	recipes,
	id,
	lastElementRef,
	lastElementId,
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

	return <StyledRecipeList>{recipesOutput}</StyledRecipeList>
}

const StyledRecipeList = styled.ul`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: clamp(250px, 30vw, 350px);
	gap: 10px;
	@media only screen and (min-width: 350px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media only screen and (min-width: 576px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media only screen and (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		gap: 15px;
	}
	@media only screen and (min-width: 992px) {
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
	/* @media only screen and (min-width: 1200px) {
		grid-template-columns: repeat(5, 1fr);
	} */
`
