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
	width: 100%;
	display: flex;
	flex-direction: column;
	@media screen and (min-width: 576px) {
		width: 90%;
	}
	@media screen and (min-width: 768px) {
		width: 80%;
	}
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
		font: 2rem ${p => p.theme.font.title};
		color: ${p => p.theme.color.white};
		border: 2px solid ${p => p.theme.color.white};
		background-color: rgba(50, 50, 50, 0.4);
		padding: 1rem;
	}
	@media screen and (min-width: 576px) {
		h1 {
			font: 2.8rem ${p => p.theme.font.title};
			padding: 1rem 2.5rem;
			border: 3px solid ${p => p.theme.color.white};
		}
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
		font: 400 1.4rem ${p => p.theme.font.body};
		color: ${p => p.theme.text.dark07};
	}
	@media screen and (min-width: 576px) {
		p {
			font: 400 1.6rem ${p => p.theme.font.body};
		}
	}
`
