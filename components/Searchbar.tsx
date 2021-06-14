import React from 'react'
import styled from 'styled-components'


const StyledSearchbar = styled.form`
	position: relative;
	width: 50%;
	max-width: 500px;
`;

const StyledInput = styled.input`
	height: 2rem;
	width: 100%;
	padding: 1rem;
	outline: none;
	font: 20px sans-serif;
	color: rgba(65,65,65,1);
	border: 1px solid black;
	border-radius: 4px;
	background-color: rgba(0,0,0,0);
	transition: .2s;
	&:hover {
		background-color: white;
	}
	&:focus {
		background-color: white;
		box-shadow: 1px 1px 7px rgba(0,0,0,.5);
	}
`;

const StyledSearchLabel = styled.label`
	pointer-events: none;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%); 
	z-index: -1;
	text-align: center;
	font: 20px sans-serif;
	color: rgba(115,115,115,1);
`;

export const Searchbar = () => {
	return (
		<StyledSearchbar>
			<StyledInput />
			<StyledSearchLabel>Search</StyledSearchLabel>
		</StyledSearchbar>
	)
}

