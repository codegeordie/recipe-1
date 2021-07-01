const { MongoClient } = require('mongodb')
let cached = global.mongo ?? { conn: null, promise: null }
//const { DB_URL, DB_NAME } = process.env

exports.connectMongo = async () => {
	if (cached.conn) return cached.conn
	if (!cached.promise) {
		// const opts = {useNewUrlParser: true, useUnifiedTopology: true}
		cached.promise = MongoClient.connect('mongodb://localhost:27017',
		 {useNewUrlParser: true, useUnifiedTopology: true}
		 ).then(client => { return {client} })
	}
cached.conn = await cached.promise
return cached.conn
}