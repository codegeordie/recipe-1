import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'


export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => {

	// const storageDir = './public'
	
	const form = new formidable.IncomingForm({
		uploadDir: './public/img',
		keepExtensions: true
	})
  
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files)

		//fuck typescript tho
		let uploadFilePath = files.photo.path.replace('public/', '')
		

		console.log('uploadFilePath :>> ', uploadFilePath)

		// fs.rename(uploadFilePath, fields.project_id, function(err) {
		// 	// if (err) next(err)
		// 	// res.end()
		// })


		res.json({url:uploadFilePath})
		//res.send(JSON.stringify({ url: uploadFilePath }));
		
		// res.writeHead(200, { 'Content-Type': 'application/json' });
		// res.end(JSON.stringify({ fields, files }, null, 2));
  })

  // res.status(200).json({ name: 'John Doe' })
}
