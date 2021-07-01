const { ObjectId } = require('mongodb')
const { connectMongo } = require('./mongo.js')

exports.queryTags = async query => {
	const { client } = await connectMongo()
	const db = client.db('recipe')
	const ingredients = db.collection('ingredients')

	const result = await ingredients
		.find({ tag_name: { $exists: true } })
		.toArray()

	return result
}
