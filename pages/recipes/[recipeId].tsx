import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Ingredients } from '../../components/Ingredients'
import { RecipeDetail } from '../../components/RecipeDetail'
import { Nav } from '../../components/Nav'
import { useGetRecipes } from '../../hooks/useGetRecipes'
import { RecipeAsProps } from '../../server/interfaces'

export default function RecipeId({ recipe }: RecipeAsProps) {
	return (
		<>
			<Nav>
				<Link href={`/`}>
					<Button>{`\u2190 Back`}</Button>
				</Link>
				<FlexSpacer />
				<Link href={`/newrecipe`}>
					<Button>New Recipe</Button>
				</Link>
			</Nav>
			<Main>
				<RecipeDetail recipe={recipe} />
				<StyledDescription>{recipe.description}</StyledDescription>
				<Ingredients
					ingrArray={recipe.ingredients_full}
					ingrRec={recipe.ingredients}
				/>
			</Main>
		</>
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

const Main = styled.main`
	min-height: 100vh;
	padding: 3rem 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${p => p.theme.color.gamma};
`

const FlexSpacer = styled.div`
	flex: 1;
`

const StyledDescription = styled.div`
	width: 80%;
	padding: 3rem;
	font: 1.8rem ${p => p.theme.font.body};
	color: ${props => props.theme.text.dark07};
`

const Button = styled.button`
	cursor: pointer;
	font: 700 2rem ${p => p.theme.font.title};
	line-height: 2rem;
	padding: 0.5rem 2rem;
	color: ${p => p.theme.color.delta};
	border: 2px solid ${p => p.theme.color.delta};
	background-color: ${p => p.theme.color.white};
	transition: 0.2s;
	&:hover {
		color: ${p => p.theme.color.white};
		background-color: ${p => p.theme.color.delta};
	}
`
