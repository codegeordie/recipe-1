const http = require('http')
const qs = require('qs')
const { queryMongo } = require('./queryMongo')

const server = http.createServer(async (req, res) => {
	const query = qs.parse(req.url.substr(1), { ignoreQueryPrefix: true })
	
	const mongoResponse = await queryMongo(query)

	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000',
	})
	res.end(JSON.stringify(mongoResponse))
})
server.listen(5000)
