import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
//import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Ingredients } from '../../components/Ingredients'
import { useGetIngredients } from '../../hooks/useGetRecipes'
import { getRecipes } from '../../server/functions'
import { QueryObject, RecipePageProps } from '../../server/interfaces'


export default function RecipeId({ ingrArray }:RecipePageProps) {

	return (
		<>
			<Ingredients ingrArray={ingrArray}/>
			<h2>
				<Link href={`/`}>Back</Link>
			</h2>
  	</>
  )
}


export const getStaticProps:GetStaticProps = async (context) => {
  const recipeId = context?.params?.recipeId
	if (typeof(recipeId) !== "string") throw new Error(`getStaticProps ID failed`)

	const { getIngredients } = useGetIngredients()
	const ingrArray = await getIngredients({type: 'ingr_rec', terms: [recipeId]})

	return {
    props: { ingrArray, recipeId },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
			'/recipes/91',
			'/recipes/92',
			'/recipes/93',
			'/recipes/94',
			'/recipes/95',
		],
    fallback: true,
  }
}

