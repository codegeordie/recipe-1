import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDebounce } from 'react-use'

export const Searchbar = ({ initialSearch }: { initialSearch: string }) => {
	const router = useRouter()

	const [searchTerm, setSearchTerm] = useState<string>(initialSearch)
	const [, cancel] = useDebounce(
		() => router.push({ query: { ...router.query, name: searchTerm } }),
		1250,
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
`

const StyledInput = styled.input`
	height: 3.8rem;
	width: 100%;
	padding: 0 1.5rem;
	outline: none;
	font: 400 2.2rem ${p => p.theme.font.title};
	color: ${p => p.theme.text.dark07};
	background-color: ${p => p.theme.color.gamma};
	border: none;
	border-left: 2px solid ${p => p.theme.color.delta};
	border-bottom: 2px solid ${p => p.theme.color.delta};
	transition: 0.25s;
	&:hover {
		box-shadow: 1px 1px 6px ${p => p.theme.color.beta};
	}
	&:focus {
		box-shadow: 1px 1px 9px ${p => p.theme.color.beta};
	}
`

const StyledSearchLabel = styled.label`
	opacity: 0 !important;
	pointer-events: none;
	position: absolute;
	left: 0;
	top: 0;
`
