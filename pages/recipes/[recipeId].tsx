import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Nav } from '../../components/Nav'
import { Ingredients } from '../../components/Ingredients'
import { RecipeDetail } from '../../components/RecipeDetail'
import { SecondaryButton } from '../../components/SecondaryButton'

import { RecipeAsProps } from '../../server/interfaces'
import { getRecipeById, getRecipesAll } from '../../functions/api/recipes'

export default function RecipeId({ recipe }: RecipeAsProps) {
	return (
		<>
			<Nav>
				<Link href={`/`}>
					<a>
						<SecondaryButton small>{`\u2190 Back`}</SecondaryButton>
					</a>
				</Link>
				<FlexSpacer />
				<Link href={`/newrecipe`}>
					<a>
						<SecondaryButton>New Recipe</SecondaryButton>
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

	const recipeArr = await getRecipeById(recipeId)
	const recipe = recipeArr[0]

	return {
		props: { recipe },
	}
}

export async function getStaticPaths() {
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
