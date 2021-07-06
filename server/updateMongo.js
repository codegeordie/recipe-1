const { ObjectId } = require('mongodb')
const { connectMongo } = require('./mongo.js')
const _ = require('lodash')

exports.updateMongo = async () => {
	const { client } = await connectMongo()
	const db = client.db('recipe')
	const recipes = db.collection('recipes')
	const ingredients = db.collection('ingredients')

	//this function needs improvement

	let ingredientTruth = await ingredients.find().toArray()
	let currentCost = 0
	let currentCalories = 0
	let currentTags = []

	recipes.find().forEach(recipe => {
		recipe.ingredients.map(ingredient => {
			for (let i of ingredientTruth) {
				if (ingredient.ingredient_id.equals(i._id)) {
					currentCost += (i.cost.value / i.quantity) * ingredient.quantity
					currentCalories += (i.calories / i.quantity) * ingredient.quantity
				}
			}
		})
		currentCost = Math.round(currentCost / recipe.servings)
		currentCalories = Math.round(currentCalories / recipe.servings)
		recipes.update(
			{ _id: recipe._id },
			{
				$set: {
					cost: {
						value: currentCost,
						currency: 'USD',
					},
					calories: currentCalories,
				},
			}
		)
		currentCost = 0
		currentCalories = 0
	})
	console.log('mongo recipes updated to current price')
}
