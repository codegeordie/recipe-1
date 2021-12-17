import Dinero from 'dinero.js'
import React from 'react'
import styled from 'styled-components'
import { Recipe } from '../server/interfaces'

export const RecipeMain: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
	return (
		<>
			<StyledRecipeGrid>
				<StyledImageWrapper>
					<img src={recipe.image}></img>
				</StyledImageWrapper>

				<StyledHeading>
					<StyledTitle>{recipe.label}</StyledTitle>
					<p>{recipe.source}</p>
				</StyledHeading>

				<StyledStatWrapper>
					<p>{`${recipe.yield} servings`}</p>
					<p>{`${Dinero({
						amount: Math.round(recipe.cost.value / recipe.yield),
						currency: recipe.cost.currency,
					}).toFormat('$0,0.00')} each`}</p>
				</StyledStatWrapper>

				<StyledNutrition>
					<span>Nutrition</span>
					<li>Fat: {recipe.totalNutrients.FAT.quantity.toFixed(1)}g</li>
					<li>Protein: {recipe.totalNutrients.PROCNT.quantity.toFixed(1)}g</li>
					<li>Carbs: {recipe.totalNutrients.CHOCDF.quantity.toFixed(1)}g</li>
				</StyledNutrition>

				<StyledIngredients>
					<span>Ingredients</span>
					{recipe.ingredientLines.map(i => (
						<StyledIngredientSingleton key={recipe + i}>
							{i}
						</StyledIngredientSingleton>
					))}
				</StyledIngredients>
			</StyledRecipeGrid>
		</>
	)
}

const StyledRecipeGrid = styled.div`
	height: 100%;
	max-height: 100vh;
	width: clamp(300px, 80vw, 525px);
	margin: 1rem 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	row-gap: 2rem;
`

const StyledImageWrapper = styled.div`
	grid-column: 1 / 4;
	grid-row: 1 / 3;
	height: 300px;
	width: 100%;
	display: flex;
	img {
		flex: 1;
		object-fit: cover;
	}
	@media (max-width: 576px) {
		grid-column: 1 / 4;
		height: 200px;
	}
`

const StyledHeading = styled.div`
	grid-column: 2 / 4;
	grid-row: 1 / 2;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	> * {
		padding: 0.5rem;
		background-color: rgba(255, 255, 255, 0.8);
		text-align: right;
	}
	h2 {
		font: 2rem ${p => p.theme.font.title};
		margin-top: 3rem;
	}
	p {
		font: 1.5rem ${p => p.theme.font.title};
		color: ${p => p.theme.text.dark07};
	}
	@media (max-width: 576px) {
		grid-column: 1 / 4;
		grid-row: 1 / 3;
	}
`

const StyledTitle = styled.h2``

const StyledStatWrapper = styled.div`
	grid-column: 3 / 4;
	grid-row: 2 / 3;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-color: rgba(255, 255, 255, 0.8);
	border: thin solid rgba(0, 0, 0, 0.2);
	margin: 2rem;
	padding: 1rem;
	p {
		text-align: center;
		font: 1.4rem ${p => p.theme.font.body};
		color: ${p => p.theme.text.dark09};
	}
	@media (max-width: 576px) {
		grid-column: 1 / 4;
		grid-row: 3 / 4;
		flex-direction: row;
		justify-content: center;
		margin: 0 2rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		p {
			flex: 1;
			color: ${p => p.theme.text.dark07};
		}
	}
`

const StyledNutrition = styled.ul`
	border-top: thin solid rgba(0, 0, 0, 0.2);
	span {
		display: block;
		font: 700 1.5rem ${p => p.theme.font.title};
		color: ${p => p.theme.text.dark07};
		padding: 0.5rem;
	}
	li {
		padding: 1rem;
		font: 1.3rem ${p => p.theme.font.title};
	}
	/* @media (max-width: 576px) {
		grid-column: 1 / 4;
	} */
`

const StyledIngredients = styled.ul`
	border-top: thin solid rgba(0, 0, 0, 0.2);
	grid-column: 2 / 4;
	border-left: thin solid rgba(0, 0, 0, 0.2);
	padding-left: 1rem;
	@media (min-width: 576px) {
	}
	span {
		display: block;
		font: 700 1.5rem ${p => p.theme.font.title};
		color: ${p => p.theme.text.dark07};
		padding: 0.5rem;
	}
`

const StyledIngredientSingleton = styled.li`
	padding: 0.5rem;
	margin: 0 1rem;
	font: 1.4rem ${p => p.theme.font.body};
	:not(:last-child) {
		border-bottom: thin solid rgba(0, 0, 0, 0.1);
	}
`
