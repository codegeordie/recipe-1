const express = require('express')
const cors = require('cors')
const formidable = require('formidable')

const { queryMongo } = require('./queryMongo')
const { queryIngredients } = require('./queryIngredients')
const { queryTags } = require('./queryTags')
const { pushMongoRecipe } = require('./pushMongoRecipe')

const app = express()
app.use(cors())
app.use(express.json())

// recipes endpoint
app.get('/api/recipes/', async (req, res) => {
	let dbRes = await queryMongo(req.query)

	res.end(JSON.stringify(dbRes))
})

// ingredients endpoint
app.get('/api/ingredients/', async (req, res) => {
	let dbRes = await queryIngredients(req.query)

	res.end(JSON.stringify(dbRes))
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

	res.end(JSON.stringify(dbRes))
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

//mostly functinal cors headers posterity

// res.writeHead(200, {
// 	'Content-Type': 'application/json',
// 	'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Headers': '*',
// })