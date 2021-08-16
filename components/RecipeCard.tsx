import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { RecipeAsProps } from '../server/interfaces'
import Dinero from 'dinero.js'
import { deleteRecipe } from '../functions/api/recipes'

export const RecipeCard = ({ recipe }: RecipeAsProps) => {
	return (
		<>
			{/* <Link href={`/recipes/${recipe._id}`}> */}
			<StyledRecipeCard>
				<StyledRecipeImage src={recipe.image} />

				{/* <TestInfoBar>
					<p>test</p>
					<button onClick={() => deleteRecipe(recipe._id)}>delete</button>
				</TestInfoBar> */}
				<Link href={`/recipes/${recipe._id}`}>
					<a>
						<InfoWrapper>
							<FoodTitle>{recipe.name}</FoodTitle>
							<FoodDesc>{recipe.description}</FoodDesc>
						</InfoWrapper>
						<StatsWrapper>
							<FoodStat>{recipe.serving_cal}cal</FoodStat>

							{recipe.favorited && <FoodStat>❤️</FoodStat>}

							<FoodStat>
								{Dinero({
									amount: recipe.cost.value,
									currency: recipe.cost.currency,
								}).toFormat('$0,0.00')}
							</FoodStat>
						</StatsWrapper>
					</a>
				</Link>
			</StyledRecipeCard>
			{/* </Link> */}
		</>
	)
}

const InfoWrapper = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	transform: translateY(60%);
	transition: 0.35s;
	background-color: ${p => p.theme.color.white};
`

const FoodDesc = styled.p`
	padding: 0.5rem;
	opacity: 0;
	transition: 0.15s;
	font: 400 1.6rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark09};
`

const StyledRecipeCard = styled.li`
	cursor: pointer;
	position: relative;
	//margin: 0.75rem;
	//width: 250px;
	//height: 300px;
	background-color: ${p => p.theme.color.white};
	border: 3px solid ${p => p.theme.color.white};
	overflow: hidden;
	transition: 0.3s;
	box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2);
	&:hover {
		box-shadow: 1px 1px 15px -5px ${p => p.theme.color.delta};
	}
	&:hover ${InfoWrapper} {
		transform: translateY(15%);
	}
	&:hover ${FoodDesc} {
		opacity: 100%;
	}
`

const StyledRecipeImage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 65%;
`

const FoodTitle = styled.h4`
	padding: 1rem;
	text-align: center;
	font: 700 1.8rem ${p => p.theme.font.title};
	color: ${p => p.theme.text.dark07};
	//color: ${p => p.theme.color.delta};
`

const StatsWrapper = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	display: flex;
	padding: 0.5rem;
	border-top: 1px solid ${p => p.theme.text.dark03};
	background-color: ${p => p.theme.color.white};
`

const FoodStat = styled.p`
	flex: 1;
	text-align: center;
	font: 200 1.5rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
`

const TestInfoBar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 3rem;
	background-color: rgba(255, 255, 255, 0.6);
	display: flex;
	flex-direction: row;
`
