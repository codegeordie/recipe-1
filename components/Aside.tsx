import React from 'react'
import styled from 'styled-components'
import { CalorieSlider } from './CalorieSlider'
import { IndexCurrencyDropdown } from './IndexCurrencyDropdown'
import { TagFilters } from './TagFilters'
import { FavoritesToggle } from './FavoritesToggle'
import { useRouter } from 'next/router'
import { darken, transparentize } from 'polished'
import { RecipeViewSelector } from './RecipeViewSelector'

export const Aside: React.FC<{ isMenu: boolean }> = ({ isMenu }) => {
	const router = useRouter()

	return (
		<StyledAside isMenu={isMenu}>
			<StyledAsideLabel>View</StyledAsideLabel>
			<RecipeViewSelector />
			{router.isReady && <FavoritesToggle />}
			<StyledAsideLabel>Calories</StyledAsideLabel>
			{router.isReady && <CalorieSlider rangeMin={0} rangeMax={1000} />}
			<StyledAsideLabel>Currency</StyledAsideLabel>
			<IndexCurrencyDropdown />
			<StyledAsideLabel>Filters</StyledAsideLabel>
			<TagFilters />
		</StyledAside>
	)
}

const StyledAside = styled.aside<{ isMenu: boolean }>`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	@media only screen and (max-width: 575px) {
		${p => (p.isMenu ? null : `display: none;`)};
		min-width: 65vw;
		background-color: ${p =>
			transparentize(0.07, darken(0.1, p.theme.color.gamma))};
	}
	@media only screen and (min-width: 576px) {
		grid-column: 1 / 6;
	}
	@media only screen and (min-width: 768px) {
		grid-column: 1 / 5;
	}
	@media only screen and (min-width: 992px) {
		grid-column: 1 / 4;
	}
`

const StyledAsideLabel = styled.span`
	font: 700 1.2rem ${p => p.theme.font.title};
	text-transform: uppercase;
	color: ${p => p.theme.text.dark07};
	margin-bottom: 0.5rem;
`
