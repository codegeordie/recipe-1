import axios from 'axios'
import qs from 'querystring'
import { Tag } from '../server/interfaces'

export const useGetTags = () => {
	const getTags = async () => {
		//const search = qs.stringify(query)
		const { data } = await axios.get<Tag[]>(
			// `http://localhost:5000/tags/?${search}`,
			`http://localhost:3000/api/queryTags`
		)

		return data
	}

	return {
		getTags,
	}
}
