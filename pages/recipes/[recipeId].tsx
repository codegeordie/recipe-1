import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
//import { useRouter } from 'next/router'
//import { useEffect, useState } from 'react'
import { Ingredients } from '../../components/Ingredients'
import { getRecipes } from '../../server/functions'
import { QueryObject, RecipePageProps } from '../../server/interfaces'


export default function RecipeId({ ingredientArray }:RecipePageProps) {
	return (
		<>
			<Ingredients populatedIngredients={ingredientArray}/>
			<h2>
				<Link href={`/`}>Back</Link>
			</h2>
  	</>
  )
}

export const getStaticProps:GetStaticProps = async (context) => {
  const recipeId = context?.params?.recipeId
	if (typeof(recipeId) !== "string") throw new Error(`getStaticProps ID failed`)
	
	const SearchObj = {type: 'ingr_rec', terms: [recipeId]}

  const fetchIngredients = async (query:QueryObject) => {
    const mongoResponse = await getRecipes(query)
    return mongoResponse
	}

	const ingredientArray = await fetchIngredients(SearchObj)
 
	return {
    props: { ingredientArray, recipeId },
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

