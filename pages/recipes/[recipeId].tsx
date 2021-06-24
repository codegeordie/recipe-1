import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Ingredients } from '../../components/Ingredients'
import { RecipeDetail } from '../../components/RecipeDetail'
import { useGetRecipes } from '../../hooks/useGetRecipes'
import { RecipeAsProps } from '../../server/interfaces'

export default function RecipeId({ recipe }: RecipeAsProps) {
	return (
		<Container>
			<RecipeDetail recipe={recipe} />
			<RecipeDesc>{recipe.description}</RecipeDesc>
			<Ingredients ingrArray={recipe.ingredients_full} />
			<h3><Link href={`/`}>Back</Link></h3>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async context => {
	const recipeId = context?.params?.recipeId
	if (typeof recipeId !== 'string') throw new Error(`getStaticProps ID failed`)

	const { getRecipes } = useGetRecipes()
	const recipeArr = await getRecipes({ id: [recipeId] })
	const recipe = recipeArr[0]

	return {
		props: { recipe },
	}
}

export async function getStaticPaths() {
	const { getRecipes } = useGetRecipes()
	const recipe = await getRecipes({})
	const paths = recipe.map(i => `/recipes/${i._id}`)

	return { paths, fallback: true }
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const RecipeDesc = styled.div`
	width: 80%;
	padding: 3rem;
	font: 14px;
	color: ${props => props.theme.colors.text};
`
