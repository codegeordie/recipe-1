import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Nav } from '../components/Nav'
import { Searchbar } from '../components/Searchbar'
import { RecipeList } from '../components/RecipeList'
import { TagFilters } from '../components/TagFilters'
import { CalorieSlider } from '../components/CalorieSlider'
import { PrimaryButton } from '../components/Button'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'
import { Modal } from '../components/Modal'
import { CurrencyDropdown } from '../components/CurrencyDropdown'
import { UserMenu } from '../components/UserMenu'
import { Toggle } from '../components/Toggle'

import { getCurrency, setCurrency } from '../functions/api/users'

import { useDispatch, useSelector } from 'react-redux'
import {
	createdBool,
	showFavorites,
	toggleShowCreated,
	toggleShowFavorites,
} from '../redux/slices/recipesSlice'
import {
	changeCurrency,
	userCurrencyPreference,
} from '../redux/slices/userSlice'
import {
	recipeArray as reduxRecipeArray,
	currentRecipe as reduxCurrentRecipe,
	setRecipeArray,
	appendRecipeArray,
	setCurrentRecipe,
	setPossibleTags,
} from '../redux/slices/recipeListSlice'
import { useGetRecipes } from '../hooks/useGetRecipes'
import { RecipeMain } from '../components/RecipeMain'
import { Recipe } from '../server/interfaces'

import { getTags } from '../functions/api/tags'
import { ModalClean } from '../components/ModalClean'
import { MemoPrimaryButton, MemoSecondaryButton } from '../components/Button'

export default function Home(): JSX.Element {
	const router = useRouter()
	const [session, loading] = useSession()
	const dispatch = useDispatch()
	const { getRecipes } = useGetRecipes()

	const showOnlyFavorites = useSelector(showFavorites)
	const showOnlyCreated = useSelector(createdBool)
	const recipeArray = useSelector(reduxRecipeArray)
	const currency = useSelector(userCurrencyPreference)

	/////////// start all the modal shit	///////////////////
	const currentRecipe = useSelector(reduxCurrentRecipe)
	const { slug, ...rest } = router.query

	const onCloseModal = () => {
		if (Object.keys(rest).length !== 0) {
			router.push({ pathname: `/`, query: rest })
		} else router.push('/')
	}
	///fix this
	let modalParam: Recipe | undefined

	if (slug?.includes('r')) {
		//check if slug[1] is a recipe?
		//404 if it isn't or just don't show modal?

		const curRec = recipeArray.find(x => x._id === slug[1])
		if (curRec) {
			dispatch(setCurrentRecipe(curRec))
			modalParam = currentRecipe
		}
		//if (curRec) console.log('curRec :>> ', curRec)
		// this action should set from available array if possible, while fetching and refreshing
	}
	/////////// end modal shit //////////////////

	useEffect(() => {
		getTags().then(res => dispatch(setPossibleTags(res)))
	}, [])

	let hasMoreResults = false
	useEffect(() => {
		const awaitGetRecipes = async () => {
			const { data, hasMore } = await getRecipes({ limit })
			dispatch(setRecipeArray(data))
			hasMoreResults = hasMore
		}
		awaitGetRecipes()
	}, [router.query, showOnlyCreated, showOnlyFavorites, currency, getRecipes])

	useEffect(() => {
		if (loading) return
		if (session) {
			getCurrency().then(userCurr => {
				if (userCurr) dispatch(changeCurrency(userCurr))
			})
			// .catch(err => {
			// 	console.log('err', err)
			// })
		}
	}, [session, loading])

	useEffect(() => {
		if (session) setCurrency({ currency: currency })
	}, [currency])

	let cursor: string | undefined
	const limit: number | undefined = 20

	const observer = useRef<IntersectionObserver>()
	const lastElementId = useRef<string>()
	const lastElementRef = useCallback(
		(element: HTMLElement) => {
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMoreResults) {
					cursor = lastElementId.current
					const awaitGetRecipes = async () => {
						const { data } = await getRecipes({ cursor, limit })
						dispatch(appendRecipeArray(data))
					}

					awaitGetRecipes()
				}
			})
			if (element) observer.current.observe(element)
		},
		[getRecipes]
	)

	console.log('index rendered')

	return (
		<>
			<Head>
				<title>Recipes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<StyledPageBackground>
				{modalParam && (
					<ModalClean isOpen={true} onCloseModal={onCloseModal}>
						<RecipeMain recipe={modalParam} />
					</ModalClean>
				)}
				<StyledPageGrid>
					<Nav>
						{router.isReady && <Searchbar />}
						<StyledNavFlexSpacer />
						<StyledNavButtonsWrapper>
							{session && (
								<>
									<Modal buttonText='New Recipe'>
										<RecipeSubmitModal />
									</Modal>
									<Modal buttonText='Hello'>
										<RecipeMain recipe={recipeArray[4]} />
									</Modal>
									<UserMenu />
									<div data-test-id='authenticated'></div>
								</>
							)}
							{!session && (
								<>
									<PrimaryButton onClick={() => signIn()}>Login</PrimaryButton>
								</>
							)}
						</StyledNavButtonsWrapper>
					</Nav>

					{/* <MobileAside>
						<Modal buttonText='Filters' small={true}>
							<StyledFiltersModal>
								{session && (
									<>
										<StyledToggleWrapper>
											<Toggle
												label='Only My Recipes'
												onChange={() => dispatch(toggleShowCreated())}
											/>
											<Toggle
												label='Only My Favorites'
												onChange={() => dispatch(toggleShowFavorites())}
											/>
										</StyledToggleWrapper>
									</>
								)}
								{router.isReady && <TagFilters />}
								<CalorieSlider rangeMin={0} rangeMax={800} />
								<StyledDropdownWrapper>
									<CurrencyDropdown />
								</StyledDropdownWrapper>
							</StyledFiltersModal>
						</Modal>
						<StyledMobileNavButtonsWrapper>
							{session && (
								<>
									<Modal buttonText='New Recipe' small={true}>
										<RecipeSubmitModal />
									</Modal>
									<UserMenu small={true} />
								</>
							)}
							{!session && (
								<>
									<PrimaryButton onClick={() => signIn()} small>
										Login
									</PrimaryButton>
								</>
							)}
						</StyledMobileNavButtonsWrapper>
					</MobileAside> */}

					<Aside>
						{session && (
							<>
								<StyledToggleWrapper>
									{/* <Toggle
										label='Only My Recipes'
										onChange={() => dispatch(toggleShowCreated())}
									/> */}
									<Toggle
										label='Only My Favorites'
										onChange={() => dispatch(toggleShowFavorites())}
									/>
								</StyledToggleWrapper>
							</>
						)}
						<TagFilters />
						<CalorieSlider rangeMin={0} rangeMax={800} />

						<StyledDropdownWrapper>
							<CurrencyDropdown />
						</StyledDropdownWrapper>
					</Aside>

					<Main>
						{recipeArray && (
							<RecipeList
								id='rlist'
								recipes={recipeArray}
								lastElementRef={lastElementRef}
								lastElementId={lastElementId}
								cardHeight={300}
							/>
						)}
					</Main>
				</StyledPageGrid>
			</StyledPageBackground>
		</>
	)
}

const StyledPageBackground = styled.div`
	background-color: ${p => p.theme.color.gamma};
`

const StyledPageGrid = styled.div`
	max-width: 1300px;
	margin: 0 auto;
	padding: 0 10px;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: 75px 50px minmax(calc(100vh - 125px), auto);
	@media only screen and (min-width: 576px) {
		//grid-template-rows: 100px minmax(calc(100vh - 100px), auto);
		grid-template-rows: 100px calc(100vh - 100px);
	}
`

const MobileAside = styled.aside`
	grid-column: 1 / 13;
	grid-row: 2 / 2;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	> :not(:first-child) {
		margin-left: 10px;
	}
	@media only screen and (min-width: 576px) {
		display: none;
	}
`

const StyledFiltersModal = styled.div`
	padding: 20px;
`

const Aside = styled.aside`
	grid-column: 1 / 4;
	padding-right: 15px;
	padding-bottom: 30px;
	display: flex;
	flex-direction: column;
	@media only screen and (max-width: 575px) {
		display: none;
	}
	@media only screen and (min-width: 992px) {
		grid-column: 1 / 3;
		padding-right: 30px;
	}
`

const Main = styled.main`
	grid-column: 1 / 13;
	@media only screen and (min-width: 576px) {
		grid-column: 4 / 13;
	}
	@media only screen and (min-width: 992px) {
		grid-column: 3 / 13;
	}
`

const StyledNavFlexSpacer = styled.div`
	flex: 1;
	@media only screen and (max-width: 575px) {
		display: none;
	}
`

const StyledMobileNavButtonsWrapper = styled.div`
	display: flex;
	> :not(:first-child) {
		margin-left: 10px;
	}
	@media only screen and (min-width: 576px) {
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

const StyledToggleWrapper = styled.div`
	display: grid;
	row-gap: 15px;
	margin-bottom: 15px;
`

const StyledDropdownWrapper = memo(styled.div`
	margin-top: 40px;
	width: 100%;
`)
