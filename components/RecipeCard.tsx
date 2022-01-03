import React, { memo } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { RecipeAsProps } from '../server/interfaces'
import Dinero from 'dinero.js'
import { setFavorite } from '../functions/api/users'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/client'
import { Star as StarIcon, StarFilled as StarIconFilled } from '@air/icons'

export const RecipeCard = memo(({ recipe, lastElementRef }: RecipeAsProps) => {
	const dispatch = useDispatch()
	const [session] = useSession()

	const pushWithQuery = () => {
		Router.push({ pathname: `/r/${recipe._id}/`, query: { ...Router.query } })
	}

	return (
		<StyledRecipeCard data-test-id={`recipe-card`} ref={lastElementRef}>
			<StyledImageWrapper>
				<StyledLinkButton onClick={pushWithQuery}>
					<img src={recipe.image} />
				</StyledLinkButton>
			</StyledImageWrapper>
			<StyledInfoWrapper>
				<StyledButtonBar>
					{recipe.favorited && (
						<StyledHeartButton
							data-test-id='unsetFavoriteButton'
							onClick={() =>
								dispatch(
									setFavorite({ recipeId: recipe._id, setFavBool: false })
								)
							}
						>
							<StarIconFilled width='30' fill='#0fb3a2' />
						</StyledHeartButton>
					)}
					{!recipe.favorited && session && (
						<StyledHeartButton
							data-test-id='setFavoriteButton'
							onClick={() =>
								dispatch(
									setFavorite({ recipeId: recipe._id, setFavBool: true })
								)
							}
						>
							<StarIcon width='30' fill='white' fillOpacity='0.8' />
						</StyledHeartButton>
					)}
				</StyledButtonBar>
				<StyledLinkButton onClick={pushWithQuery}>
					<StyledFoodTitle>{recipe.label}</StyledFoodTitle>
				</StyledLinkButton>
			</StyledInfoWrapper>
			<StyledStatsWrapper>
				<StyledFoodStat>{recipe.serving_cal}cal</StyledFoodStat>
				<StyledFoodStat>
					{Dinero({
						amount: Math.round(recipe.cost.value / recipe.yield),
						currency: recipe.cost.currency,
					}).toFormat('$0,0.00')}
				</StyledFoodStat>
			</StyledStatsWrapper>
		</StyledRecipeCard>
	)
})
RecipeCard.displayName = 'RecipeCard'

const StyledRecipeCard = styled.li`
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 6fr minmax(0, 3fr) 1fr;
	background-color: ${p => p.theme.color.white};
	border: thin solid rgba(0, 0, 0, 0.2);
	border-radius: 7px;
	overflow: hidden;
`

const StyledLinkButton = styled.button`
	all: unset;
	width: 100%;
	cursor: pointer;
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
	display: flex;
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
	background: none;
	outline: none;
	border: none;
	cursor: pointer;
	border-radius: 50%;
	transition: 0.3s;
	&:hover {
		background: radial-gradient(
			circle,
			rgba(0, 0, 0, 0.4) 0%,
			rgba(0, 0, 0, 0.25) 20%,
			rgba(0, 0, 0, 0) 70%
		);
	}
`

const StyledFoodTitle = styled.h4`
	margin: 0.5rem;
	text-align: center;
	font: 700 1.4rem ${p => p.theme.font.title};
	max-height: 6.1rem;
	color: ${p => p.theme.text.dark07};
	display: block;
	display: -webkit-box;
	line-height: 1;
	line-clamp: 3;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-word;
	&:hover {
		text-decoration: underline;
	}
	@media only screen and (min-width: 576px) {
		margin: 1rem;
		max-height: 7.1rem;
	}
	@media only screen and (min-width: 768px) {
		font: 700 1.5rem ${p => p.theme.font.title};
		max-height: 7.4rem;
	}
`

const StyledStatsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 5px;
	place-content: center;
	padding: 0.5rem;
	border-top: thin solid rgba(0, 0, 0, 0.1);
	background-color: rgba(0, 0, 0, 0.07);
`

const StyledFoodStat = styled.p`
	flex: 1;
	text-align: center;
	font: 200 1.3rem ${p => p.theme.font.body};
	color: ${p => p.theme.text.dark07};
	@media only screen and (min-width: 768px) {
		font: 200 1.4rem ${p => p.theme.font.body};
	}
`
