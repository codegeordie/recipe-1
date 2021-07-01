import axios from 'axios'
import qs from 'querystring'
import { Tag } from '../server/interfaces'

export const useGetTags = () => {
	const getTags = async () => {
		//const search = qs.stringify(query)
		const { data } = await axios.get<Tag[]>(
			`http://localhost:5001/api/tags`
			// `http://localhost:5001/api/tags/?${search}`
		)

		return data
	}

	return {
		getTags,
	}
}
