import styled from 'styled-components'
import React from 'react'

export const Nav = ({ children }: { children?: React.ReactNode }) => {
	return <StyledNav>{children}</StyledNav>
}

// const StyledNav = styled.nav`
// 	width: 100vw;
// 	height: 7rem;
// 	padding: 1rem 2rem;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	background-color: ${p => p.theme.color.white};
// 	border-bottom: 1px solid ${p => p.theme.color.delta};
// `

const StyledNav = styled.nav`
	grid-column: 1 / 13;
	display: flex;
	align-items: center;
`
