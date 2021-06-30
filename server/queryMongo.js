const { ObjectId } = require('mongodb')
const { connectMongo } = require('./mongo.js')

exports.queryMongo = async query => {
	const { client } = await connectMongo()
	const db = client.db('recipe')
	const recipes = db.collection('recipes')

	let result = []
	let tagFilter = [].concat(query.filters)

	const lookupIngredients = {
		from: 'ingredients',
		localField: 'ingredients.ingredient_id',
		foreignField: '_id',
		as: 'ingredients_full',
	}

	if (Object.keys(query).length === 0) {
		result = await recipes
			.aggregate([
				{ $match: { _id: { $exists: true } } },
				{ $lookup: lookupIngredients },
			])
			.toArray()
	} else if (query.hasOwnProperty('name')) {
		const reggie = new RegExp(query.name, 'i')
		const onlyName = { name: { $regex: reggie } }
		const withFilter = {
			$and: [{ name: { $regex: reggie } }, { tags: { $all: tagFilter } }],
		}
		const matchLogic = query.filters ? withFilter : onlyName

		result = await recipes
			.aggregate([{ $match: matchLogic }, { $lookup: lookupIngredients }])
			.toArray()
	} else if (query.hasOwnProperty('id')) {
		result = await recipes
			.aggregate([
				{ $match: { _id: ObjectId(query.id) } },
				{ $lookup: lookupIngredients },
			])
			.toArray()
	} else {
		throw new Error('Unhandled mongo query case, everything is broken')
	}

	return result
}
