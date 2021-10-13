import _ from 'lodash'
import Router from 'next/router'
import React, { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Tag, Option } from '../server/interfaces'
import { CheckboxForm } from './CheckboxForm'
import { useSelector } from 'react-redux'
import { possibleTags as reduxPossibleTags } from '../redux/slices/recipeListSlice'
import { useQueryFilters } from '../hooks/useQueryFilters'

export const TagFilters: React.FC = memo(() => {
	const { filters } = useQueryFilters()
	const possibleTags = useSelector(reduxPossibleTags)

	const memoizedTags = useMemo(
		() =>
			possibleTags.map((tag: Tag) => ({
				id: tag.tag_name,
				label: tag.tag_name,
			})),
		[possibleTags]
	)

	const onSubmit = useCallback((filterArray: Option[]) => {
		const filterString = filterArray.map(tag => tag.label)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filters, ...rest } = Router.query

		if (_.isEmpty(filterString))
			if (_.isEmpty(rest)) Router.push('/', undefined, { shallow: true })
			else Router.push({ query: rest })
		else Router.push({ query: { ...rest, filters: filterString } })
	}, [])

	//console.log('filters')

	return (
		<StyledTagFilters>
			{possibleTags && (
				<CheckboxForm
					options={memoizedTags}
					initialChecked={filters}
					onSubmit={onSubmit}
				/>
			)}
		</StyledTagFilters>
	)
})
TagFilters.displayName = 'TagFilters'

const StyledTagFilters = styled.div`
	margin-bottom: 25px;
	overflow: auto;
`
