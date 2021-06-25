const { ObjectId } = require('mongodb')
const { connectMongo } = require('../pages/api/mongo.js')
const { updateMongo } = require('./updateMongo')

exports.pushMongoRecipe = async recipe => {
	const { client } = await connectMongo()
	const db = client.db('recipe')
	const recipes = db.collection('recipes')

	recipeUpdate(recipe)
	recipes.insertOne(recipe).then(updateMongo())
}

const recipeUpdate = recipe => {

	recipe.ingredients.forEach(i => {
		i.ingredient_id = new ObjectId(i.ingredient_id)
		i.quantity = parseInt(i.quantity)
	})

	recipe.tags = []
	recipe.calories = 0
	recipe.cost = { value: 0, currency: 'USD' }

}