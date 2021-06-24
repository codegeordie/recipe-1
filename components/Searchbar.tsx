import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface SearchBarProps {
	onSearch: (searchString: string) => void
}

export const Searchbar = ({ onSearch }: SearchBarProps) => {
	const [touched, setTouched] = useState<boolean>(false)
	const [searchTerm, setSearchTerm] = useState<string>('')

	useEffect(() => {
		setTouched(searchTerm ? true : false)
		onSearch(searchTerm)
	}, [searchTerm])

	return (
		<StyledSearchbar onSubmit={e => e.preventDefault()}>
			<StyledInput
				type='text'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				touched={touched}
			/>
			<StyledSearchLabel>Search</StyledSearchLabel>
		</StyledSearchbar>
	)
}

const StyledSearchbar = styled.form`
	position: relative;
	width: 50%;
	max-width: 500px;
`

interface InputProps {
  touched: boolean;
}

const StyledInput = styled.input<InputProps>`
	height: 2rem;
	width: 100%;
	padding: 1rem;
	outline: none;
	font: 20px sans-serif;
	color: rgba(65, 65, 65, 1);
	border: 1px solid black;
	border-radius: 4px;
	background-color: ${props => (props.touched ? 'white' : 'rgba(0,0,0,0)')};
	transition: 0.2s;
	&:hover {
		background-color: white;
	}
	&:focus {
		background-color: white;
		box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.5);
	}
`

const StyledSearchLabel = styled.label`
	pointer-events: none;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: -1;
	text-align: center;
	font: 20px sans-serif;
	color: rgba(115, 115, 115, 1);
`
