import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
//import { useRouter } from 'next/router'
//import { useEffect, useState } from 'react'
import { Ingredients } from '../../components/Ingredients'
import { populateIngredients } from '../../server/functions'
import { RecipePageProps } from '../../server/interfaces'


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
	
	const ingredientArray = await populateIngredients(recipeId)
  
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

