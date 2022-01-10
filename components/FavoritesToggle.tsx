import React, { memo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/client'
import { toggleShowFavorites } from '../redux/slices/recipesSlice'
import { Toggle } from './Toggle'

export const FavoritesToggle = memo(() => {
	const [session] = useSession()
	const dispatch = useDispatch()

	return (
		<>
			{session && (
				<>
					<StyledLabel>Favorites</StyledLabel>
					<StyledToggleWrapper>
						<Toggle
							label='Show Only Favorites'
							onChange={() => dispatch(toggleShowFavorites())}
						/>
					</StyledToggleWrapper>
				</>
			)}
		</>
	)
})
FavoritesToggle.displayName = 'FavoritesToggle'

const StyledToggleWrapper = styled.div`
	display: grid;
	row-gap: 15px;
	margin-bottom: 2rem;
`

const StyledLabel = styled.span`
	font: 700 1.2rem ${p => p.theme.font.title};
	text-transform: uppercase;
	color: ${p => p.theme.text.dark07};
	margin-bottom: 0.5rem;
`
