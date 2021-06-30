import type { NextApiRequest, NextApiResponse } from 'next'
import { connectMongo } from '../../server/mongo.js'
import { ObjectId } from 'mongodb'

type Data = {
  name: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //const { ObjectId } = require('mongodb')
  //const { connectMongo } = require('../../server/mongo.js')

    const { client } = await connectMongo()

    const db = client.db('recipe')
    const ingredients = db.collection('ingredients')
    const tag = req.query.tag
    // const result = await ingredients.update(
    //   { _id: ObjectId('60d616f44eaaa2075f11ff51') },
    //   { $push: { tagIndex: { 
    //     tag_id: new ObjectId(),
    //     tag: tag
    //   } } }
    // )
    
    const result = await ingredients.find(
      { tag_name: { $exists: true } }
    ).toArray()

    res.status(200).send(result)
  }