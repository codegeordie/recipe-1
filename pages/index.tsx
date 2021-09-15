import Head from 'next/head'
import Link from 'next/link'
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
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { RecipeSubmitModal } from '../components/RecipeSubmitModal'
import { Modal } from '../components/Modal'
import { CurrencyDropdown } from '../components/CurrencyDropdown'
import { UserMenu } from '../components/UserMenu'
import { Toggle } from '../components/Toggle'

import { getRecipes } from '../functions/api/recipes'
import { getCurrency, setCurrency } from '../functions/api/users'

import { useDispatch, useSelector } from 'react-redux'
import {
	createdBool,
	toggleShowCreated,
	toggleShowFavorites,
} from '../redux/slices/recipesSlice'
import { RootState } from '../redux/store'
import {
	changeCurrency,
	userCurrencyPreference,
} from '../redux/slices/userSlice'
import {
	recipeArray as reduxRecipeArray,
	refreshRecipeArray,
} from '../redux/slices/recipeListSlice'
import { Input } from '../components/Input'

import axios from 'axios'
import { math } from 'polished'

export default function Home() {
	const router = useRouter()
	const [session, loading] = useSession()
	const dispatch = useDispatch()

	const showOnlyFavorites = useSelector(
		(state: RootState) => state.recipes.showOnlyFavorites
	)
	const showOnlyCreated = useSelector(createdBool)
	const recipeArray = useSelector(reduxRecipeArray)
	const currency = useSelector(userCurrencyPreference)
	const currencyCode = currency.id

	useEffect(() => {
		if (router.isReady)
			getRecipes({
				...router.query,
				showOnlyCreated,
				showOnlyFavorites,
				currency: currencyCode,
			}).then(recipes => dispatch(refreshRecipeArray(recipes)))
	}, [router.query, showOnlyCreated, showOnlyFavorites, currency])

	useEffect(() => {
		if (session) {
			getCurrency().then(userCurr => {
				if (userCurr) dispatch(changeCurrency(userCurr))
			})
			// .catch(err => {
			// 	console.log('err', err)
			// })
		}
	}, [session])

	useEffect(() => {
		if (session) setCurrency({ currency: currency })
	}, [currency])

	//////////////////////////////
	//const [testvalue, setTestvalue] = useState()

	const getDups = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL222}/populatethestuff`
		).then(res => res.json())
		console.log('response :>> ', response)

		response.forEach(async dup => {
			for (let i = dup.count - 1; i > 0; i--) {
				const idDup = dup.uniqueIds[i]
				console.log('idDup :>> ', idDup)
				const dbRes = await axios.delete(
					`${process.env.NEXT_PUBLIC_API_URL222}/populatethestuff/${idDup}`
				)
				console.log('dbRes :>> ', dbRes)
			}
		})
	}

	const getMore = async () => {
		const timer = ms => new Promise(res => setTimeout(res, ms))

		const loop = async () => {
			// const searchArray = [
			// 	'salmon',
			// 	'lobster',
			// 	'chicken',
			// 	'italian',
			// 	'indian',
			// 	'pizza',
			// 	'pasta',
			// 	'stew',
			// 	'burger',
			// 	'cajun',
			// 	'vegan',
			// 	'vegetarian',
			// ]
			// const searchArray = [
			// 	'french',
			// 	'scallops',
			// 	'thai',
			// 	'japanese',
			// 	'vietnamese',
			// 	'ham',
			// 	'sandwich',
			// 	'soup',
			// 	'wrap',
			// 	'gluten',
			// 	'roasted',
			// 	'german',
			// ]
			// const searchArray = [
			// 	'peppers',
			// 	'beans',
			// 	'taco',
			// 	'quesadilla',
			// 	'burrito',
			// 	'turkey',
			// 	'sausage',
			// 	'cheese',
			// 	'snack',
			// 	'cake',
			// 	'chocolate',
			// 	'cherry',
			// 	'apple',
			// 	'pie',
			// 	'dessert',
			// ]
			// const searchArray = [
			// 	'breakfast',
			// 	'egg',
			// 	'yogurt',
			// 	'bacon',
			// 	'scallops',
			// 	'steak',
			// 	'brie',
			// 	'gnocchi',
			// 	'cod',
			// 	'tuna',
			// 	'vanilla',
			// 	'pear',
			// 	'asparagus',
			// 	'broccoli',
			// 	'salad',
			// 	'healthy',
			// 	'carrot',
			// 	'smoothie',
			// 	'dinner',
			// ]
			for (const search of searchArray) {
				const CORE_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=5071a1b3&app_key=8a2f16ef67e4171a74fb7906dbe2d2ca&imageSize=LARGE`
				let url = CORE_URL
				for (let i = 0; i < 5; i++) {
					const results = await fetch(url).then(res => res.json())
					const parsedResults = results.hits.map(hit => hit.recipe)

					const dbResponse = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL222}/populatethestuff`,
						parsedResults
					)
					if (dbResponse.data === 'err') break

					url = results._links.next.href
					const wait = 7000 + Math.floor(Math.random() * 5000)
					await timer(wait)
					console.log(
						`${search}: page ${i}. insertedCount: ${dbResponse.data.insertedCount}`
					)
				}
			}
		}

		loop()
	}

	//////////////////////////////

	return (
		<>
			<Head>
				<title>Recipes</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<StyledPageBackground>
				<StyledPageGrid>
					<Nav>
						{router.isReady && <Searchbar />}
						<form onSubmit={e => e.preventDefault()}>
							{/* <input
								value={testvalue}
								onChange={e => setTestvalue(e.currentTarget.value)}
							/> */}
							{/* <PrimaryButton onClick={() => getMore(testvalue)}>
								No
							</PrimaryButton> */}
							<PrimaryButton onClick={() => getMore()}>Start</PrimaryButton>
							<PrimaryButton onClick={() => getDups()}>Dups</PrimaryButton>
						</form>
						<StyledNavFlexSpacer />
						<StyledNavButtonsWrapper>
							{session && (
								<>
									<Modal buttonText='New Recipe'>
										<RecipeSubmitModal />
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

					<MobileAside>
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
								<TagFilters />
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
					</MobileAside>

					<Aside>
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
						<TagFilters />
						<CalorieSlider rangeMin={0} rangeMax={800} />
						<StyledDropdownWrapper>
							<CurrencyDropdown />
						</StyledDropdownWrapper>
					</Aside>

					<Main>
						{recipeArray && <RecipeList id='rlist' recipes={recipeArray} />}
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
		grid-template-rows: 100px minmax(calc(100vh - 100px), auto);
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

const StyledDropdownWrapper = styled.div`
	margin-top: 40px;
	width: 100%;
`
