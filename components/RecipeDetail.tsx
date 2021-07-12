import React from 'react'
import styled from 'styled-components'
import Dinero from 'dinero.js'
import { RecipeAsProps } from '../server/interfaces'

export const RecipeDetail = ({ recipe }: RecipeAsProps) => {
	return (
		<StyledRecipeDetail>
			<StyledHeroWrapper>
				<StyledRecipeImage src={`../${recipe.image}`} />
				<h1>{recipe.name}</h1>
			</StyledHeroWrapper>
			<StyledStatsWrapper>
				<p>{`Makes ${recipe.servings} servings`}</p>
				<p>
					{recipe.calories}
					{`cal and `}
					{Dinero({
						amount: recipe.cost.value,
						currency: recipe.cost.currency,
					}).toFormat('$0,0.00')}
					{` per serving`}
				</p>
			</StyledStatsWrapper>
		</StyledRecipeDetail>
	)
}

const StyledRecipeDetail = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
`

const StyledHeroWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 250px;
	h1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font: 2.8rem ${p => p.theme.font.title};
		color: ${p => p.theme.color.white};
		border: 3px solid ${p => p.theme.color.white};
		background-color: rgba(50, 50, 50, 0.4);
		padding: 1rem 2.5rem;
	}
`

const StyledRecipeImage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
`

const StyledStatsWrapper = styled.div`
	padding: 2rem;
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid ${p => p.theme.color.delta};
	p {
		font: 400 1.6rem ${p => p.theme.font.body};
		color: ${p => p.theme.text.dark07};
	}
`
