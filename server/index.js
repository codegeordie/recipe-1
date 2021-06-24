const http = require('http')
const qs = require('qs')
const { queryMongo } = require('./queryMongo')
const { queryIngredients } = require('./queryIngredients')
const { pushMongoRecipe } = require('./pushMongoRecipe')

const server = http.createServer(async (req, res) => {
	const query = qs.parse(req.url.substr(1), { ignoreQueryPrefix: true })

	let mongoResponse

	if (req.method === 'POST') {

		let jsonString = ''
		req.on('data', chunk => jsonString += chunk)
		req.on('end', () => {
				pushMongoRecipe(JSON.parse(jsonString))
		})

	} else {
		if (req.headers.getingredients === 'true') {
			mongoResponse = await queryIngredients(query)
		}
		else { mongoResponse = await queryMongo(query) }
	}
	res.writeHead(200, {
		'Content-Type': 'application/json',
		// 'Access-Control-Allow-Origin': 'http://localhost:3000',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
	})
	res.end(JSON.stringify(mongoResponse))
})
server.listen(5000)
