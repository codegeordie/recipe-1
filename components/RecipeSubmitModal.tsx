import React from 'react'
import { useEffect, useState } from 'react'
import { getIngredientsAll } from '../functions/api/ingredients'
import { Ingredient } from '../server/interfaces'
import { RecipeSubmitForm } from './RecipeSubmitForm'

export const RecipeSubmitModal: React.FC = () => {
	const [ingrArray, setIngrArray] = useState<Ingredient[]>()

	useEffect(() => {
		getIngredientsAll().then(i => setIngrArray(i))
	}, [])

	return <>{ingrArray && <RecipeSubmitForm ingrArray={ingrArray} />}</>
}
