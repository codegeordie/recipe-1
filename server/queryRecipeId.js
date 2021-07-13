const { ObjectId } = require('mongodb')

exports.queryRecipeId = async req => {
	const recipes = req.app.locals.db.collection('recipes')
	const query = req.query

	let result = []

	const lookupIngredients = {
		from: 'ingredients',
		localField: 'ingredients.ingredient_id',
		foreignField: '_id',
		as: 'ingredients_full',
	}

	result = await recipes
		.aggregate([
			{ $match: { _id: ObjectId(query.id) } },
			{ $lookup: lookupIngredients },
		])
		.toArray()

	return result
}
