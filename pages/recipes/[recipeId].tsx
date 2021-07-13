import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Ingredients } from '../../components/Ingredients'
import { RecipeDetail } from '../../components/RecipeDetail'
import { Nav } from '../../components/Nav'
import { Button } from '../../components/Button'

import { useGetRecipesAll } from '../../hooks/useGetRecipesAll'
import { RecipeAsProps } from '../../server/interfaces'
import { useGetRecipeId } from '../../hooks/useGetRecipeId'

export default function RecipeId({ recipe }: RecipeAsProps) {
	return (
		<>
			<Nav>
				<Link href={`/`}>
					<a>
						<Button>{`\u2190 Back`}</Button>
					</a>
				</Link>
				<FlexSpacer />
				<Link href={`/newrecipe`}>
					<a>
						<Button>New Recipe</Button>
					</a>
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

	const { getRecipeId } = useGetRecipeId()
	const recipeArr = await getRecipeId({ id: recipeId })
	const recipe = recipeArr[0]

	return {
		props: { recipe },
	}
}

export async function getStaticPaths() {
	const { getRecipesAll } = useGetRecipesAll()
	const recipe = await getRecipesAll()
	const paths = recipe.map(i => `/recipes/${i._id}`)

	return { paths, fallback: true }
}

const Main = styled.main`
	min-height: 100vh;
	padding: 3rem 0;
	//flex: 1;
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
