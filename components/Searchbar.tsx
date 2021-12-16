import React, { useState, useEffect, memo } from 'react'
import Router from 'next/router'
import _ from 'lodash'
import styled from 'styled-components'
import { useDebounce } from 'react-use'

export const Searchbar: React.FC = memo(() => {
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		if (Router.query.search) {
			setSearchTerm(
				Array.isArray(Router.query.search)
					? Router.query.search[0]
					: Router.query.search
			)
		}
	}, [])
	//	}, [router.query])

	useDebounce(
		() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { search, ...rest } = Router.query
			if (!searchTerm) {
				if (_.isEmpty(rest)) Router.push('/', undefined, { shallow: true })
				else Router.push({ query: rest })
			} else {
				Router.push({ query: { ...rest, search: searchTerm } })
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
})
Searchbar.displayName = 'Searchbar'

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
	border-radius: 7px;
	font: 400 1.8rem ${p => p.theme.font.title};
	color: ${p => p.theme.text.dark07};
	border: thin solid rgba(0, 0, 0, 0.2);
	transition: 0.25s;
	&:focus {
		border: thin solid ${p => p.theme.color.delta};
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
