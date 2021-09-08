import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Nav } from '../../components/Nav'
import { Ingredients } from '../../components/Ingredients'
import { RecipeDetail } from '../../components/RecipeDetail'
import { SecondaryButton } from '../../components/Button'

import { RecipeAsProps } from '../../server/interfaces'
import { getRecipeById, getRecipesAll } from '../../functions/api/recipes'
import { useRouter } from 'next/dist/client/router'

export default function RecipeId({ recipe }: RecipeAsProps) {
	const router = useRouter()

	return (
		<StyledPageBackground>
			<StyledPageGrid>
				<Nav>
					{/* <Link href={`/`}> */}
					<a>
						<SecondaryButton
							small
							onClick={() => router.back()}
						>{`\u2190 Back`}</SecondaryButton>
					</a>
					{/* </Link> */}
					<StyledNavFlexSpacer />
					<Link href={`/newrecipe`}>
						<a>
							<SecondaryButton small>New Recipe</SecondaryButton>
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
			</StyledPageGrid>
		</StyledPageBackground>
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

	return { paths, fallback: 'blocking' }
}

const StyledPageBackground = styled.div`
	background-color: ${p => p.theme.color.gamma};
`

const StyledPageGrid = styled.div`
	max-width: 1300px;
	margin: 0 auto;
	padding: 0 10px;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: 100px minmax(calc(100vh - 75px), auto);
`

const Main = styled.main`
	grid-column: 1 / 13;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const StyledNavFlexSpacer = styled.div`
	flex: 1;
`

const StyledDescription = styled.div`
	width: 100%;
	padding: 3rem 1.5rem;
	font: 1.6rem ${p => p.theme.font.body};
	color: ${props => props.theme.text.dark07};
	@media screen and (min-width: 576px) {
		font: 1.8rem ${p => p.theme.font.body};
		width: 85%;
		padding: 3rem;
	}
`
