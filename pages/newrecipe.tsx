import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
//import SelectSearch from 'react-select-search'
import styled from 'styled-components'
import { useGetIngredients } from '../hooks/useGetIngredients'
import { RecipeSubmitForm } from '../components/RecipeSubmitForm'
import { GetIngredientsQuery, Ingredient } from '../server/interfaces'


export default function NewRecipe() {
	const [ingrArray, setIngrArray] = useState<Ingredient[]>()
	const [query, setQuery] = useState<GetIngredientsQuery>(undefined)
	const { getIngredients } = useGetIngredients()

	useEffect(() => {
		getIngredients(query).then(i => setIngrArray(i))
	}, [])

	return (
		<Main>
			{ingrArray && <RecipeSubmitForm ingrArray={ingrArray}/>}
			<h3><Link href={`/`}>Back</Link></h3>
		</Main>
	)
}

const Main = styled.main`
	min-height: 100vh;
	padding: 3rem 0;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`
