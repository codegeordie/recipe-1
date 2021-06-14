import { recipeData } from '../src/recipedata'
import { ingredientData } from '../src/ingredientdata'
import { RecipePopulated, ingredientPopulated } from "./interfaces"

// returns ingredient details based on id
// used as helper function below
export const fetchIngredient = (id: string) => {
	const ingr = ingredientData.find(ingredient => ingredient.id === id)
	if (!ingr) throw new Error(`Where's the beef?`)
	return ingr
}

// returns recipe reformatted with ingredient details and costs
// used in index / Home component
export const populateRecipeData = (id: string) => {
	const thisRecipe = recipeData.find(recipe => recipe.id === id)
	if(!thisRecipe) throw new Error(`Failed to find a receipt with ${id} id`)
	
	const populatedRecipe:RecipePopulated = {
		...thisRecipe,
		cost: {
			value: 0,
			currency: 'USD'
		},
		calories: 0,
	}

	for (let i of populatedRecipe.ingredients) {
		const thisIngredient = fetchIngredient(i.ingredientId)
		if(!thisIngredient) throw new Error(`Failed to find ingredient ${i.ingredientId}`)
		populatedRecipe.cost.value += thisIngredient.cost.value * i.quantity
		populatedRecipe.calories += thisIngredient.calories * i.quantity
	}
	return populatedRecipe
}

export const populateIngredients = (recipeId:string): Promise<ingredientPopulated[]> => {
	const recipe = populateRecipeData(recipeId)
	// create and return new array with ingredient details
	let populatedIngredients:ingredientPopulated[] = []
	for (let i of recipe.ingredients) {
		const ingr:ingredientPopulated = fetchIngredient(i.ingredientId)
		ingr.quantity = i.quantity
		populatedIngredients.push(ingr)
	}
	return new Promise((resolve) => {
		resolve(populatedIngredients)
	})
}

