//import { recipeData } from '../src/recipedata'
//import { ingredientData } from '../src/ingredientdata'
import { RecipePopulated, ingredientPopulated, RecipeBase, QueryObject } from "./interfaces"
import axios from 'axios'

// returns ingredient details based on id
// used as helper function below
// export const fetchIngredient = (id: string) => {
// 	const ingr = ingredientData.find(ingredient => ingredient.id === id)
// 	if (!ingr) throw new Error(`Where's the beef?`)
// 	return ingr
// }

// export const updateRecipe = (id:string) => {
// 	const thisRecipe = recipeData.find(recipe => recipe.id === id)
// 	if(!thisRecipe) throw new Error(`Failed to find a receipt with ${id} id`)

// 	const populatedRecipe:RecipePopulated = {
// 		...thisRecipe,
// 		cost: {
// 			value: 0,
// 			currency: 'USD'
// 		},
// 		calories: 0,
// 	}
// 	for (let i of populatedRecipe.ingredients) {
// 		const thisIngredient = fetchIngredient(i.ingredientId)
// 		if(!thisIngredient) throw new Error(`Failed to find ingredient ${i.ingredientId}`)
// 		populatedRecipe.cost.value += thisIngredient.cost.value * i.quantity
// 		populatedRecipe.calories += thisIngredient.calories * i.quantity
// 	}
// 	return populatedRecipe
// }

const parseQuery = (query:QueryObject) => {
	const obj = `type=${query.type}&terms=${query.terms.join('&terms=')}`
	return obj
}

export const getRecipes = async (queryObj:QueryObject) => {
	const search:string = parseQuery(queryObj)

	const queryServer = async (searchString:string) => {
		console.log('searchString :>> ', searchString);
		const res = await axios.get(`http://localhost:5000/?${searchString}`)
		console.log('res.data :>> ', res.data);
		return res.data
	}

	const recipesArray:RecipePopulated[] = await queryServer(search)
	return recipesArray
}


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

