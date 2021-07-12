import _, { isString } from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect } from 'react'
import { useGetTags } from '../hooks/useGetTags'
import { Tag, Option } from '../server/interfaces'
import { CheckboxForm } from './CheckboxForm'

export const TagFilters = () => {
	const router = useRouter()
	const [possibleTags, setPossibleTags] = useState<Tag[]>()
	const { getTags } = useGetTags()

	useEffect(() => {
		getTags().then(res => setPossibleTags(res))
	}, [])

	const onSubmit = (filters: Option[]) => {
		const filterString = filters.map(tag => tag.label)
		router.push({ query: { ...router.query, filters: filterString } })
	}

	return (
		<>
			{possibleTags && router.isReady && (
				<CheckboxForm
					options={possibleTags.map(tag => ({
						id: tag._id,
						label: tag.tag_name,
					}))}
					initialChecked={
						isString(router.query.filters)
							? [router.query.filters]
							: router.query.filters
					}
					onSubmit={onSubmit}
				/>
			)}
		</>
	)
}
