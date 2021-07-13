const express = require('express')
const cors = require('cors')
const formidable = require('formidable')

const { connectMongo } = require('./mongo.js')

const { queryRecipesByName } = require('./queryRecipes')
const { queryRecipeId } = require('./queryRecipeId')
const { queryRecipeAll } = require('./queryRecipeAll')
const {
	queryIngredientsAll,
	queryIngredientsByName,
	queryIngredientsById,
} = require('./queryIngredients')
const { queryTags } = require('./queryTags')
const { pushMongoRecipe } = require('./pushMongoRecipe')

const app = express()
app.use(cors())
app.use(express.json())

connectMongo().then(({ client }) => {
	app.locals.db = client.db('recipe')

	// recipe by ID endpoint
	app.get('/api/recipeid/', async (req, res) => {
		let dbRes = await queryRecipeId(req)

		res.json(dbRes)
	})

	// all recipes endpoint
	app.get('/api/allrecipes/', async (req, res) => {
		let dbRes = await queryRecipeAll(req)

		res.json(dbRes)
	})

	// recipe search endpoint
	app.get('/api/recipes/', async (req, res) => {
		let dbRes = await queryRecipesByName(req)

		res.json(dbRes)
	})

	// ingredients endpoint
	app.get('/api/ingredients_by_name/', async (req, res) => {
		let dbRes = await queryIngredientsByName(req)

		res.json(dbRes)
	})

	// ingredients endpoint
	app.get('/api/ingredients_all/', async (req, res) => {
		let dbRes = await queryIngredientsAll(req)

		res.json(dbRes)
	})

	// recipe submit endpoint
	app.post('/api/submitrecipe/', async (req, res) => {
		let dbRes = pushMongoRecipe(req.body)
		//console.log('dbRes :>> ', await dbRes)

		res.status(200)
		// res.end(JSON.stringify(dbRes))
	})

	// currently: get all possible tags
	app.get('/api/tags', async (req, res) => {
		let dbRes = await queryTags(req.query)

		res.json(dbRes)
	})

	// image submit endpoint
	app.post('/api/imagesubmit', async (req, res) => {
		const form = new formidable.IncomingForm({
			uploadDir: './public/img',
			keepExtensions: true,
		})
		form.parse(req, (err, fields, files) => {
			// console.log(err, fields, files)
			let uploadFilePath = files.photo.path.replace('public/', '')

			res.json({ url: uploadFilePath })
		})
	})

	app.listen(5001)
})
