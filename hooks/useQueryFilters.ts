import { useEffect, useRef, useState } from 'react'
import Router from 'next/router'
import { isEqual, isString } from 'lodash'

export const useQueryFilters = () => {
	const [filters, setFilters] = useState<string[]>([])
	const filterRef = useRef<string[]>()

	useEffect(() => {
		const compareFilters = () => {
			const urlFilters = isString(Router.query.filters)
				? [Router.query.filters]
				: Router.query.filters

			if (urlFilters && !isEqual(urlFilters, filterRef.current)) {
				filterRef.current = urlFilters
				setFilters(urlFilters)
			}
		}

		Router.events.on('routeChangeComplete', compareFilters)
		return () => {
			Router.events.off('routeChangeComplete', compareFilters)
		}
	}, [])

	return {
		filters,
	}
}
