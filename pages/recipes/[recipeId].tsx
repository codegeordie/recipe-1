import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Ingredients } from '../../components/Ingredients'
import { populateIngredients } from '../../server/functions'


// export const getStaticProps: GetStaticProps = async (context) => {
//   const recipeId = context?.params?.recipeId
// 	console.log(`this is the id` + recipeId)
//   return {
//     props: { recipeId }, // will be passed to the page component as props
//   }
// }

// export async function getStaticPaths() {
//   return {
//     paths: [
// 			'/recipes/91',
// 			'/recipes/92',
// 			'/recipes/93',
// 		],
//     // Enable statically generating additional pages
//     // For example: `/posts/3`
//     fallback: true,
//   }
// }


export default function RecipeId() {
	const router = useRouter()
	const { recipeId } = router.query
	console.log(router);
	console.log(typeof window)

	useEffect(() => {
		if(recipeId) {
			const getIngredients = async () => {
				if (typeof(recipeId) !== "string") {
					throw new Error(`Bad ID from server`)
				}
	
				const ingredients = await populateIngredients(recipeId);

				console.log('ingredients :>> ', ingredients);
			}
			
			getIngredients();
			
		}
	}, [recipeId])

	// if (typeof(recipeId) !== "string") 
	
	// 

	return (
		<>
			<p>Hey</p>
  	</>
  )
}