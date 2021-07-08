import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGetIngredients } from '../hooks/useGetIngredients'
import { RecipeSubmitForm } from '../components/RecipeSubmitForm'
import { GetIngredientsQuery, Ingredient } from '../server/interfaces'
import { Nav } from '../components/Nav'
import { useRouter } from 'next/dist/client/router'
// import { useGetTags } from '../hooks/useGetTags'

export default function NewRecipe() {
	const [ingrArray, setIngrArray] = useState<Ingredient[]>()
	const [query, setQuery] = useState<GetIngredientsQuery>(undefined)
	const { getIngredients } = useGetIngredients()

	// const { getTags } = useGetTags()
	// const { push, query: nextQuery } = useRouter()

	// console.log('query :>> ', nextQuery)

	// useEffect(() => {

	// }, [nextQuery])

	useEffect(() => {
		// getTags()
		getIngredients(query).then(i => setIngrArray(i))
	}, [])

	return (
		<Main>
			<Nav>
				<Link href={`/`}>
					<Button>{`\u2190 Back`}</Button>
				</Link>
			</Nav>
			{ingrArray && <RecipeSubmitForm ingrArray={ingrArray} />}
		</Main>
	)
}

const Main = styled.main`
	min-height: 100vh;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${p => p.theme.text.dark09};
	background-color: ${p => p.theme.color.gamma};
`

// const Main = styled.main`
// 	position: relative;
// 	min-height: 100vh;
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	background-color: ${p => p.theme.color.gamma};
// `

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
