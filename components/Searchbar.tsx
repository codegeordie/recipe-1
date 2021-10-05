import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDebounce } from 'react-use'
import _ from 'lodash'

export const Searchbar: React.FC = () => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState(router.query.search ?? '')

	useEffect(() => {
		if (router.query.search) {
			setSearchTerm(
				Array.isArray(router.query.search)
					? router.query.search[0]
					: router.query.search
			)
		} else {
			setSearchTerm('')
		}
	}, [router.query])

	useDebounce(
		() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { search, ...rest } = router.query
			if (!searchTerm) {
				if (_.isEmpty(rest)) router.push('/', undefined, { shallow: true })
				else router.push({ query: rest })
			} else {
				router.push({ query: { ...rest, search: searchTerm } })
			}
		},
		250,
		[searchTerm]
	)

	return (
		<StyledSearchbar onSubmit={e => e.preventDefault()}>
			<StyledInput
				id='SearchBarInput'
				type='text'
				placeholder='Search'
				autoComplete='off'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<StyledSearchLabel htmlFor='SearchBarInput'>Search</StyledSearchLabel>
		</StyledSearchbar>
	)
}

const StyledSearchbar = styled.form`
	position: relative;
	width: clamp(300px, 500px, 50vw);
	@media only screen and (max-width: 575px) {
		width: 100%;
	}
`

const StyledInput = styled.input`
	height: 3.8rem;
	width: 100%;
	padding: 0 1.5rem;
	outline: none;
	border: none;
	border-radius: 5px;
	font: 400 2.2rem ${p => p.theme.font.title};
	color: ${p => p.theme.text.dark07};
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
	transition: 0.25s;
	&:hover {
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3),
			inset 0 0 0 1px ${p => p.theme.color.gamma};
	}
	&:focus {
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3),
			inset 0 0 0 1px ${p => p.theme.color.delta};
	}
`

const StyledSearchLabel = styled.label`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`
