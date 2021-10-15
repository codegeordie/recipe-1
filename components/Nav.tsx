import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { Searchbar } from './Searchbar'
import { RecipeSubmitModal } from './RecipeSubmitModal'
import { UserMenu } from './UserMenu'
import { PrimaryButton } from './Button'

export const Nav: React.FC = () => {
	const router = useRouter()
	const [session] = useSession()

	return (
		<StyledNav>
			{router.isReady && <Searchbar />}
			<StyledNavFlexSpacer />
			<StyledNavButtonsWrapper>
				{session && (
					<>
						<RecipeSubmitModal />
						<UserMenu />
					</>
				)}
				{!session && (
					<>
						<PrimaryButton onClick={() => signIn()}>Login</PrimaryButton>
					</>
				)}
			</StyledNavButtonsWrapper>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	grid-column: 1 / 13;
	display: flex;
	align-items: center;
`

const StyledNavFlexSpacer = styled.div`
	flex: 1;
	@media only screen and (max-width: 575px) {
		display: none;
	}
`

const StyledNavButtonsWrapper = styled.div`
	display: flex;
	> :not(:first-child) {
		margin-left: 10px;
	}
	@media only screen and (max-width: 575px) {
		display: none;
	}
`

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
