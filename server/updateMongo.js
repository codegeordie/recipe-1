const { ObjectId } = require('mongodb')
const { connectMongo } = require('./mongo.js')

exports.updateMongo = async () => {

	const { client } = await connectMongo()
	const db = client.db('recipe')
	const recColl = db.collection('recipes')
	const ingColl = db.collection('ingredients')

	let ingredientTruth = await ingColl.find().toArray()
	let currentCost = 0
	let currentCalories = 0
	recColl.find().forEach(recipe => {
		recipe.ingredients.map(ingredient => {
			for (let i of ingredientTruth) {
				if (ingredient.ingredient_id.equals(i._id)) {
					currentCost += i.cost.value * ingredient.quantity
					currentCalories += i.calories * ingredient.quantity
				}
			}
		})
		recColl.update(
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
