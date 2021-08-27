import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { RecipeAsProps } from '../server/interfaces'
import Dinero from 'dinero.js'
import { deleteRecipe } from '../functions/api/recipes'
import { SecondaryButton, TextButton } from './Button'
import { setFavorite } from '../functions/api/users'
import { recipesSlice } from '../redux/slices/recipesSlice'
import { useDispatch } from 'react-redux'

export const RecipeCard = ({ recipe }: RecipeAsProps) => {
	const dispatch = useDispatch()

	return (
		<StyledRecipeCard>
			<StyledImageWrapper>
				<Link href={`/recipes/${recipe._id}`}>
					<a>
						<img src={recipe.image} />
					</a>
				</Link>
			</StyledImageWrapper>
			<StyledInfoWrapper>
				<StyledButtonBar>
					{recipe.favorited && (
						<StyledHeartButton
							onClick={() =>
								dispatch(
									setFavorite({ recipeId: recipe._id, setFavBool: false })
								)
							}
						>
							❤️
						</StyledHeartButton>
					)}
					{!recipe.favorited && (
						<StyledHeartButton
							onClick={() =>
								dispatch(
									setFavorite({ recipeId: recipe._id, setFavBool: true })
								)
							}
						>
							🤍
						</StyledHeartButton>
					)}
				</StyledButtonBar>
				<Link href={`/recipes/${recipe._id}`}>
					<a>
						<StyledFoodTitle>{recipe.name}</StyledFoodTitle>
					</a>
				</Link>
			</StyledInfoWrapper>
			<StyledStatsWrapper>
				<StyledFoodStat>{recipe.serving_cal}cal</StyledFoodStat>
				<StyledFoodStat>
					{Dinero({
						amount: recipe.cost.value,
						currency: recipe.cost.currency,
					}).toFormat('$0,0.00')}
				</StyledFoodStat>
			</StyledStatsWrapper>
		</StyledRecipeCard>
	)
}

const StyledRecipeCard = styled.li`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 6fr 3fr 1fr;
	background-color: ${p => p.theme.color.white};
	border: 3px solid ${p => p.theme.color.white};
	transition: 0.3s;
	box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2);
	&:hover {
		//box-shadow: 1px 1px 15px -5px ${p => p.theme.color.delta};
		//border: 3px solid ${p => p.theme.color.delta};
	}
`

const StyledImageWrapper = styled.div`
	overflow: hidden;
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
`

const StyledInfoWrapper = styled.div`
	position: relative;
	padding-top: 10px;
`

const StyledButtonBar = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	transform: translateY(-100%);
	display: flex;
	justify-content: flex-end;
`

const StyledHeartButton = styled.button`
	font-size: 2.5rem;
	padding: 5px;
	border-radius: 50%;
	background: none;
	outline: none;
	border: none;
	cursor: pointer;
`

const StyledFoodTitle = styled.h4`
	padding: 1rem;
	text-align: center;
	font: 700 1.8rem ${p => p.theme.font.title};
	color: ${p => p.theme.text.dark07};
	&:hover {
		text-decoration: underline;
	}
`

const StyledStatsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 5px;
	place-content: center;
	padding: 0.5rem;
	border-top: 1px solid ${p => p.theme.text.dark03};
`

const StyledFoodStat = styled.p`
	flex: 1;
	text-align: center;
	font: 200 1.5rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
`
