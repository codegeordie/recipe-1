const { ObjectId } = require('mongodb')
const { connectMongo } = require('./mongo.js')

exports.queryIngredients = async query => {
	const { client } = await connectMongo()
	const db = client.db('recipe')
	const ingredients = db.collection('ingredients')
	let result = []

	if (Object.keys(query).length === 0) {
		result = await ingredients
			.aggregate([{ $match: { $and: [
				{ _id: { $exists: true } },
				{ tag_name: { $exists: false } },
				{ tagIndex: { $exists: false } }
			]}}])
			.toArray()
	} else if (query.hasOwnProperty('name')) {
		const reggie = new RegExp(query.name, 'i')
		result = await ingredients
			.aggregate([
				{ $match: { name: { $regex: reggie } } },
				//OH SHIT WHAT IF LOOKUP GOT NAME MATCHES FROM RECIPES?!?
				// {
				// 	$lookup: {
				// 		from: 'ingredients',
				// 		localField: 'ingredients.ingredient_id',
				// 		foreignField: '_id',
				// 		as: 'ingredients_full',
				// 	},
				// },
			])
			.toArray()
		return result
	} else if (query.hasOwnProperty('id')) {
		result = await ingredients
			.aggregate([{ $match: { _id: ObjectId(query.id) } }])
			.toArray()
	} else {
		throw new Error('Unhandled mongo ingredient query case, shits broke')
	}
	//console.log('result :>> ', result)
	return result
}