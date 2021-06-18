


export default async function mainMongo(){
	var mongo = require('mongodb').MongoClient
	let client, db
	try{
		 client = await mongo.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
		 db = client.db('recipe');
		 let dCollection = db.collection('recipes');
		 let result = await dCollection.find();   
			// other mongo things as needed
		 return result.toArray();
	}
	catch(err){ console.error(err); }
 }
