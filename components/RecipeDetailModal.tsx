import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalClean } from './ModalClean'
import { RecipeMain } from './RecipeMain'

import {
	recipeArray as reduxRecipeArray,
	currentRecipe as reduxCurrentRecipe,
	setCurrentRecipe,
} from '../redux/slices/recipeListSlice'
import { getRecipeById } from '../functions/api/recipes'

export const RecipeDetailModal = memo(() => {
	const dispatch = useDispatch()
	const router = useRouter()

	const recipeArray = useSelector(reduxRecipeArray)
	const currentRecipe = useSelector(reduxCurrentRecipe)
	const { slug, ...rest } = router.query

	const [isModalOpen, setIsModalOpen] = useState(false)

	const closeModal = () => {
		setIsModalOpen(false)
		if (Object.keys(rest).length !== 0) {
			router.push({ pathname: `/`, query: rest })
		} else router.push('/')
	}

	const recipeIdParam = slug?.includes('r') ? slug[1] : null

	useEffect(() => {
		if (recipeIdParam) {
			const getModalRecipe = async () => {
				const recipe =
					recipeArray.find(r => r._id === recipeIdParam) ??
					(await getRecipeById(recipeIdParam))
				dispatch(setCurrentRecipe(recipe))
			}
			getModalRecipe()
			setIsModalOpen(true)
		}
	}, [recipeIdParam])

	return (
		<>
			{isModalOpen && (
				<ModalClean closeModal={closeModal}>
					{currentRecipe && <RecipeMain recipe={currentRecipe} />}
				</ModalClean>
			)}
		</>
	)
})
RecipeDetailModal.displayName = 'RecipeDetailModal'
