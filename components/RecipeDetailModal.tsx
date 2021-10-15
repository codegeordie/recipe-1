import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalClean } from './ModalClean'
import { RecipeMain } from './RecipeMain'

import {
	recipeArray as reduxRecipeArray,
	currentRecipe as reduxCurrentRecipe,
	setCurrentRecipe,
} from '../redux/slices/recipeListSlice'
import { Recipe } from '../server/interfaces'

export const RecipeDetailModal = memo(() => {
	const dispatch = useDispatch()
	const router = useRouter()

	const recipeArray = useSelector(reduxRecipeArray)
	const currentRecipe = useSelector(reduxCurrentRecipe)
	const { slug, ...rest } = router.query

	const onCloseModal = () => {
		if (Object.keys(rest).length !== 0) {
			router.push({ pathname: `/`, query: rest })
		} else router.push('/')
	}
	///fix this
	let modalParam: Recipe | undefined

	if (slug?.includes('r')) {
		//check if slug[1] is a recipe?
		//404 if it isn't or just don't show modal?

		const curRec = recipeArray.find(x => x._id === slug[1])
		if (curRec) {
			dispatch(setCurrentRecipe(curRec))
			modalParam = currentRecipe
		}
		//if (curRec) console.log('curRec :>> ', curRec)
		// this action should set from available array if possible, while fetching and refreshing
	}

	return (
		<>
			{modalParam && (
				<ModalClean isOpen={true} onCloseModal={onCloseModal}>
					<RecipeMain recipe={modalParam} />
				</ModalClean>
			)}
		</>
	)
})
RecipeDetailModal.displayName = 'RecipeDetailModal'
