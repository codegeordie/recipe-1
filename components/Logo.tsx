import React from 'react'
import styled from 'styled-components'

export const Logo: React.FC = () => {
	return <StyledLogo>Recipes</StyledLogo>
}

const StyledLogo = styled.h1`
	height: 100%;
	width: 100%;
	display: grid;
	place-content: center;
	cursor: default;
	font: 400 3.5rem ${p => p.theme.font.logo};
	color: ${p => p.theme.color.delta};
	text-shadow: 2px 2px white;
	grid-column: 1 / 13;
	@media only screen and (min-width: 576px) {
		grid-column: 1 / 6;
		font: 400 4.8rem ${p => p.theme.font.logo};
	}
	@media only screen and (min-width: 768px) {
		grid-column: 1 / 5;
	}
	@media only screen and (min-width: 992px) {
		grid-column: 1 / 4;
	}
`
