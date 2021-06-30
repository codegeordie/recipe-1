import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGetTags } from '../hooks/useGetTags'
import { Tag } from '../server/interfaces'
import { CheckboxForm, CheckboxFormProps } from './CheckboxForm'

type FiltersWrapperProps = {
	onSubmit: CheckboxFormProps['onSubmit']
}

export const FiltersWrapper = ({ onSubmit }: FiltersWrapperProps) => {
	const [possibleTags, setPossibleTags] = useState<Tag[]>()
	const { getTags } = useGetTags()

	useEffect(() => {
		getTags().then(res => setPossibleTags(res))
	}, [])

	return (
		<>
			{possibleTags && (
				<CheckboxForm options={possibleTags} onSubmit={onSubmit} />
			)}
		</>
	)
}
