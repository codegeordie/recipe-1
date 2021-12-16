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
				<StyledToggleWrapper>
					<Toggle
						label='Show Only Favorites'
						onChange={() => dispatch(toggleShowFavorites())}
					/>
				</StyledToggleWrapper>
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
