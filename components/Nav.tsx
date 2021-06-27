import styled from 'styled-components'
import React from 'react'
import Link from 'next/link'

export const Nav = ({ children }) => {
	return (
			<StyledNav>
				{children}
			</StyledNav>
	)
}

const StyledNav = styled.nav`
	width: 100vw;
	height: 7rem;
	padding: 1rem 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${p => p.theme.color.white};
	border-bottom: 2px solid ${p => p.theme.color.delta};
`

