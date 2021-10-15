import React from 'react'
import styled from 'styled-components'
import { CalorieSlider } from './CalorieSlider'
import { IndexCurrencyDropdown } from './IndexCurrencyDropdown'
import { TagFilters } from './TagFilters'
import { FavoritesToggle } from './FavoritesToggle'
import { useRouter } from 'next/router'

export const Aside: React.FC = () => {
	const router = useRouter()

	return (
		<StyledAside>
			{router.isReady && <FavoritesToggle />}
			{router.isReady && <CalorieSlider rangeMin={0} rangeMax={1000} />}
			<IndexCurrencyDropdown />
			<TagFilters />
		</StyledAside>
	)
}

const StyledAside = styled.aside`
	grid-column: 1 / 4;
	padding: 15px;
	//padding-bottom: 30px;
	display: flex;
	flex-direction: column;
	@media only screen and (max-width: 575px) {
		display: none;
	}
	@media only screen and (min-width: 992px) {
		//grid-column: 1 / 3;
		//padding-right: 30px;
	}
`
