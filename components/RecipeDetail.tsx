import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Dinero from 'dinero.js'
import { RC_Props, Recipe } from '../server/interfaces'

const Container = styled.div`
	width: 80%;
	display: flex;
	flex-wrap: 0;
`

const Wrapper = styled.div`
	position: relative;
	width: 70%;
	height: 250px;
`

const StyledRecipeImage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 250px;
`

const StyledRecipeDetail = styled.div`
	width: 30%;
	padding: 2rem;
	font: 16px black;
	display: flex;
	flex-direction: column;
	border: 1px solid black;
`

const RecipeH1 = styled.h1`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: 0;
	text-align: center;
	color: white;
	border: 3px solid white;
	background-color: rgba(50, 50, 50, 0.4);
	padding: 1rem 3rem;
`

export const RecipeDetail = ({ recipe }:RC_Props) => {

	return (
		<Container>
			<Wrapper>
				<StyledRecipeImage src={`../` + recipe.image} />
				<RecipeH1>{recipe.name}</RecipeH1>
			</Wrapper>
			<StyledRecipeDetail>
				<p>Calories: {recipe.calories}</p>
				<p>
					Cost:{' '}
					{Dinero({
						amount: recipe.cost.value,
						currency: recipe.cost.currency,
					}).toFormat('$0,0.00')}
				</p>
			</StyledRecipeDetail>
		</Container>
	)
}
