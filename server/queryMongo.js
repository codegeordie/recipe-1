const { ObjectId } = require('mongodb')
const { connectMongo } = require('../pages/api/mongo.js')

exports.queryMongo = async query => {
	const { client } = await connectMongo()
	const db = client.db('recipe')
	const recipes = db.collection('recipes')
	let result = []

	if (Object.keys(query).length === 0) {
		result = await recipes
			.aggregate([
				{ $match: { _id: { $exists: true } } },
				{
					$lookup: {
						from: 'ingredients',
						localField: 'ingredients.ingredient_id',
						foreignField: '_id',
						as: 'ingredients_full',
					},
				},
			])
			.toArray()
	} else if (query.hasOwnProperty('name')) {
		const reggie = new RegExp(query.name, 'i')
		result = await recipes
			.aggregate([
				{ $match: { name: { $regex: reggie } } },
				{
					$lookup: {
						from: 'ingredients',
						localField: 'ingredients.ingredient_id',
						foreignField: '_id',
						as: 'ingredients_full',
					},
				},
			])
			.toArray()
		return result
	} else if (query.hasOwnProperty('id')) {
		result = await recipes
			.aggregate([
				{ $match: { _id: ObjectId(query.id) } },
				{
					$lookup: {
						from: 'ingredients',
						localField: 'ingredients.ingredient_id',
						foreignField: '_id',
						as: 'ingredients_full',
					},
				},
			])
			.toArray()
	} else {
		throw new Error('Unhandled mongo query case, everything is broken')
	}
	//console.log('result :>> ', result)
	return result
}
