import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import _, { isString } from 'lodash'
import { useDebounce } from '../hooks/useDebounce'

export const Searchbar = () => {
	const router = useRouter()

	const initialSearchTerm = isString(router.query.name) ? router.query.name : ''
	// console.log('initialSearchTerm :>> ', initialSearchTerm)
	const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm)
	const [searchActual, setSearchActual] = useState<string>(initialSearchTerm)

	const onSearch = useCallback(useDebounce(setSearchActual, 200), [])

	useEffect(() => {
		// console.log('searchTerm :>> ', searchTerm)
		onSearch(searchTerm)
	}, [searchTerm])

	useEffect(() => {
		// console.log('searchActual :>> ', searchActual)
		router.push({ query: { ...router.query, name: searchActual } })
	}, [searchActual])

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
