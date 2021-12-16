import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Searchbar } from './Searchbar'
import { PrimaryButton, SecondaryButton } from './Button'
import { AsideMobileMenu } from './AsideMobileMenu'

export const Nav: React.FC = () => {
	const router = useRouter()
	const [session] = useSession()

	return (
		<StyledNav>
			<AsideMobileMenu />
			{router.isReady && <Searchbar />}
			<StyledNavButtonsWrapper>
				{session && (
					<SecondaryButton onClick={() => signOut()}>
						Sign&nbsp;Out
					</SecondaryButton>
				)}
				{!session && (
					<PrimaryButton onClick={() => signIn()}>Login</PrimaryButton>
				)}
			</StyledNavButtonsWrapper>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	grid-column: 1 / 13;
	display: flex;
	align-items: center;
	padding: 0 2.5rem;
	@media only screen and (min-width: 576px) {
		padding: 0 1.5rem 0 0;
		grid-column: 6 / 13;
	}
	@media only screen and (min-width: 768px) {
		grid-column: 5 / 13;
	}
	@media only screen and (min-width: 992px) {
		grid-column: 4 / 13;
	}
`

const StyledNavButtonsWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
	margin-left: 1rem;
`
