import { Tag } from '../../server/interfaces'

export const getTags = async () => {
	const response: Tag[] = await fetch(
		`http://localhost:5001/api/tags`
	).then(res => res.json())

	return response
}
