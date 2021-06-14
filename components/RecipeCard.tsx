import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { RecipeCardProps } from '../server/interfaces'
import Dinero from "dinero.js"


const InfoWrapper = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	transform: translateY(65%);
	transition: .4s;
	background-color: rgba(255,255,255,1);
`;

const FoodDesc = styled.p`
	margin: 0;
	padding: .5rem;
	opacity: 0;
	transition: .2s;
`;

const StyledRecipeCard = styled.li`
	position: relative;
	margin: .75rem;
	width: 250px;
	height: 300px;
	background-color: rgba(255,255,255,1);
	box-shadow: 1px 1px 7px rgba(0,0,0,.5);
	overflow: hidden;
	transition: .4s;
	&:hover {
		box-shadow: 1px 1px 11px rgba(0,0,0,.6);
	}
	&:hover ${InfoWrapper} {
		transform: translateY(25%);
	}
	&:hover ${FoodDesc} {
		opacity: 100%;
	}
`;

const StyledRecipeImage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 65%;
`;

const FoodTitle = styled.h4`
	margin: 0;
	padding: .5rem;
	font-size: 1.3rem;
	text-align: center;
`;

const StatsWrapper = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	padding: .5rem;
	display: flex;
	border-top: 1px solid grey;
	background-color: rgba(255,255,255,1);
`;

const FoodStat = styled.p`
	flex: 1;
	margin: 0;
	padding: 0;
	text-align: center;
`;

export const RecipeCard = ({ recipeData }:RecipeCardProps) => {
	return (
		<Link href={`/recipes/${recipeData.id}`}>
			<StyledRecipeCard>
				<StyledRecipeImage src={recipeData.image}/>
				<InfoWrapper>
					<FoodTitle>{recipeData.name}</FoodTitle>
					<FoodDesc>{recipeData.description}</FoodDesc>
				</InfoWrapper>
				<StatsWrapper>
					<FoodStat>{recipeData.calories}cal</FoodStat>
					<FoodStat>
						{Dinero({ amount: recipeData.cost.value,
										 currency: recipeData.cost.currency 
										}).toFormat('$0,0.00')}
					</FoodStat>
				</StatsWrapper>
			</StyledRecipeCard>
		</Link>
	)
}
