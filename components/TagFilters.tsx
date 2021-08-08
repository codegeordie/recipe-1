import _, { isString } from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getTags } from '../functions/api/tags'
import { Tag, Option } from '../server/interfaces'
import { CheckboxForm } from './CheckboxForm'

export const TagFilters = () => {
	const router = useRouter()
	const [possibleTags, setPossibleTags] = useState<Tag[]>()

	useEffect(() => {
		getTags().then(res => setPossibleTags(res))
	}, [])

	const onSubmit = (filterArray: Option[]) => {
		const filterString = filterArray.map(tag => tag.label)
		const { filters, ...rest } = router.query

		if (_.isEmpty(filterString))
			if (_.isEmpty(rest)) router.push('/', undefined, { shallow: true })
			else router.push({ query: rest })
		else router.push({ query: { ...rest, filters: filterString } })
	}

	return (
		<StyledTagFilters>
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
		</StyledTagFilters>
	)
}

const StyledTagFilters = styled.div`
	//border: 1px solid pink;
	margin-bottom: 25px;
`
