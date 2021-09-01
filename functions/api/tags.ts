import { Tag } from '../../server/interfaces'

export const getTags = async () => {
	const response: Tag[] = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/tags`
	).then(res => res.json())

	return response
}
