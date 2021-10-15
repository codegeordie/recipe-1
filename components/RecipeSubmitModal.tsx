import React from 'react'
import { useEffect, useState } from 'react'
import { getIngredientsAll } from '../functions/api/ingredients'
import { Ingredient } from '../server/interfaces'
import { Modal } from './Modal'
import { RecipeSubmitForm } from './RecipeSubmitForm'

export const RecipeSubmitModal: React.FC = () => {
	const [ingrArray, setIngrArray] = useState<Ingredient[]>()

	useEffect(() => {
		getIngredientsAll().then(i => setIngrArray(i))
	}, [])

	return (
		<>
			{ingrArray && (
				<Modal buttonText='New Recipe'>
					<RecipeSubmitForm ingrArray={ingrArray} />
				</Modal>
			)}
		</>
	)
}
