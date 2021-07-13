const { ObjectId } = require('mongodb')

exports.queryIngredientsAll = async req => {
	const ingredients = req.app.locals.db.collection('ingredients')

	let result = []
	result = await ingredients
		.aggregate([
			{
				$match: {
					$and: [
						{ _id: { $exists: true } },
						{ tag_name: { $exists: false } },
						{ tagIndex: { $exists: false } },
					],
				},
			},
		])
		.toArray()

	return result
}

exports.queryIngredientsByName = async req => {
	const ingredients = req.app.locals.db.collection('ingredients')
	const query = req.query

	let result = []
	const reggie = new RegExp(query.name, 'i')
	result = await ingredients
		.aggregate([
			{ $match: { name: { $regex: reggie } } },
			//NAME MATCHES FROM RECIPES?!?
		])
		.toArray()

	return result
}

exports.queryIngredientsById = async req => {
	const ingredients = req.app.locals.db.collection('ingredients')
	const query = req.query

	let result = []
	result = await ingredients
		.aggregate([{ $match: { _id: ObjectId(query.id) } }])
		.toArray()

	return result
}
