import { isString } from 'lodash'
import { useRouter } from 'next/router'

export const useQueryParams = () => {
	const { query, isReady } = useRouter()

	const filters = isString(query.filters) ? [query.filters] : query.filters
	const search = Array.isArray(query.search) ? query.search[0] : query.search

	return { isReady, filters, search }
}
