import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
	toggleShowCreated,
	toggleShowFavorites,
} from '../redux/slices/recipesSlice'
import { PrimaryButton } from './Button'
import { CalorieSlider } from './CalorieSlider'
import { IndexCurrencyDropdown } from './IndexCurrencyDropdown'
import { Modal } from './Modal'
import { RecipeSubmitModal } from './RecipeSubmitModal'
import { TagFilters } from './TagFilters'
import { Toggle } from './Toggle'
import { UserMenu } from './UserMenu'

export const AsideMobile = () => {
	const router = useRouter()
	const session = useSession()
	const dispatch = useDispatch()

	return (
		<StyledAsideMobile>
			<Modal buttonText='Filters' small={true}>
				<StyledFiltersModal>
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
					{router.isReady && <TagFilters />}
					<CalorieSlider rangeMin={0} rangeMax={800} />
					<IndexCurrencyDropdown />
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
		</StyledAsideMobile>
	)
}

const StyledAsideMobile = styled.aside`
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

const StyledToggleWrapper = styled.div`
	display: grid;
	row-gap: 15px;
	margin-bottom: 15px;
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
