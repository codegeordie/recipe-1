//import qs from 'querystring'
import { Tag } from '../server/interfaces'

export const useGetTags = () => {
	const getTags = async () => {
		//const search = qs.stringify(query)
		const data: Tag[] = await fetch(`http://localhost:5001/api/tags`).then(
			res => res.json()
		)

		return data
	}

	return {
		getTags,
	}
}
