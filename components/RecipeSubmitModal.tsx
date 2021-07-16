import { useEffect, useState } from 'react'
import { useGetIngredientsAll } from '../hooks/useGetIngredientsAll'
import { Ingredient } from '../server/interfaces'
import { RecipeSubmitForm } from './RecipeSubmitForm'

export const RecipeSubmitModal = () => {
	const [ingrArray, setIngrArray] = useState<Ingredient[]>()
	const { getIngredientsAll } = useGetIngredientsAll()

	useEffect(() => {
		getIngredientsAll().then(i => setIngrArray(i))
	}, [])

	return <>{ingrArray && <RecipeSubmitForm ingrArray={ingrArray} />}</>
}
