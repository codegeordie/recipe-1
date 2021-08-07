import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { Nav } from '../components/Nav'
import { Searchbar } from '../components/Searchbar'
import { RecipeList } from '../components/RecipeList'
import { TagFilters } from '../components/TagFilters'
import { CalorieSlider } from '../components/CalorieSlider'
import { PrimaryButton } from '../components/PrimaryButton'
import { SecondaryButton } from '../components/SecondaryButton'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'
import { Modal } from '../components/Modal'
import { OldDropdown } from '../components/Dropdown'
import { Recipe } from '../server/interfaces'

import { getRecipes } from '../functions/api/recipes'
import { getFavorites } from '../functions/api/users'

export default function Home() {
	const router = useRouter()
	const [session, loading] = useSession()
	const [recipeArray, setRecipeArray] = useState<Recipe[]>([])
	// const [favoriteArray, setFavoriteArray] = useState<Recipe[]>([])

	useEffect(() => {
		if (router.isReady)
			getRecipes(router.query).then(recipes => setRecipeArray(recipes))
	}, [router.query])

	// useEffect(() => {
	// 	if (session && session.user) {
	// 		getFavorites({ id: session.user.uid }).then(recipes =>
	// 			setFavoriteArray(recipes)
	// 		)
	// 	}
	// }, [session])

	return (
		<>
			<Head>
				<title>Recipes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Main>
				<Nav>
					{router.isReady && <Searchbar />}

					{/* {router.isReady && <OldDropdown />} */}
					<StyledNavButtonsWrapper>
						{session && (
							<>
								<Modal buttonText='New Recipe'>
									<RecipeSubmitModal />
								</Modal>
								<SecondaryButton onClick={() => signOut()}>
									Log Out
								</SecondaryButton>
							</>
						)}
						{!session && (
							<>
								<PrimaryButton onClick={() => signIn()}>Login</PrimaryButton>
							</>
						)}
					</StyledNavButtonsWrapper>
				</Nav>
				<StyledContentWrapper>
					<StyledSidebarWrapper>
						<TagFilters />
						<CalorieSlider rangeMin={0} rangeMax={800} />
					</StyledSidebarWrapper>
					<StyledRecipeListsWrapper>
						{/* {session && (
							<StyledFavoritesWrapper>
								<RecipeList id='flist' recipes={favoriteArray} />
							</StyledFavoritesWrapper>
						)} */}
						{recipeArray && <RecipeList id='rlist' recipes={recipeArray} />}
					</StyledRecipeListsWrapper>
				</StyledContentWrapper>
			</Main>
		</>
	)
}

const Main = styled.main`
	position: relative;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: ${p => p.theme.color.gamma};
`

const StyledContentWrapper = styled.div`
	display: flex;
	flex: 1;
`

const StyledSidebarWrapper = styled.div`
	width: 13vw;
	min-width: 13vw;
	display: flex;
	flex-direction: column;
	background-color: ${p => p.theme.color.white};
	padding: 0.5rem;
`

const StyledRecipeListsWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const StyledNavButtonsWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`

const StyledFavoritesWrapper = styled.div`
	background-color: #ddeeed;
	margin: 2rem;
`
