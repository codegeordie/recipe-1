const http = require('http')
const path = require('path')
const url = require('url')

const server = http.createServer(async (req, res) => {
	const query = new URLSearchParams(req.url.substr(1))
	const mongoResponse = await queryMongo(query)

	console.log('mongoResponse :>> ', mongoResponse);

	await updateMongo()
	res.writeHead(200, { 
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000'
	});
	res.end(JSON.stringify( mongoResponse ))
})
server.listen(5000)


async function queryMongo(query) {
	var mongo = require('mongodb').MongoClient
	let client, db, result
	try {
		client = await mongo.connect(
			'mongodb://localhost:27017', 
			{useNewUrlParser: true, useUnifiedTopology: true}
		)
		db = client.db('recipe')
		let recipes = db.collection('recipes')
		let ingredients = db.collection('ingredients')
		const qtype = query.get('type')
		const qterms = query.getAll('terms')

		switch(qtype) {
			case 'id':
				result = await recipes.find({ id:{$in:qterms} })
				break
			case 'name':
				result = await recipes.find({ name:{$in:qterms} })
				break;
			case 'ingr':
				let recipeIngredients = await recipes.find({ id:{$in:qterms} })
															.project({_id:0, ingredients:1})
															.toArray()
				let ingrIds = []
				recipeIngredients[0].ingredients.map(i => {
					ingrIds.push(i.ingredientId)
				})
				result = await ingredients.find({ id:{$in:ingrIds} })
				break;
			case 'ingr_id':
				result = await ingredients.find({ _id:{$in:qterms} })
				break;
			default:
				console.log("default")
				result = await db.recipes.find()
		}
		return result.toArray()
	}
	catch(err){ console.error(err); }
}



async function updateMongo() {
	var mongo = require('mongodb').MongoClient
	let client, db
	try {
		client = await mongo.connect(
			'mongodb://localhost:27017',
			{useNewUrlParser: true, useUnifiedTopology: true}
		)
		db = client.db('recipe')
		let collectionRecipes = db.collection('recipes')
		let collectionIngredients = db.collection('ingredients')

		let ingredientTruth = await collectionIngredients.find().toArray()
		let currentCost = 0;
		let currentCalories = 0;
		collectionRecipes.find().forEach(recipe => {
			recipe.ingredients.map(ingredient => {
				for (let i of ingredientTruth) {
					if (ingredient.ingredientId == i.id) {
						currentCost += (i.cost.value * ingredient.quantity)
						currentCalories += (i.calories * ingredient.quantity)
					}
				}
			})
			collectionRecipes.update({_id: recipe._id}, {
				$set: {
					cost: {
						value: currentCost,
						currency: 'USD'
					},
					calories: currentCalories
				}
			})
			currentCost = 0
			currentCalories = 0
		})
		console.log('mongo recipes updated to current price')
	}
	catch(err){ console.error(err); }
}