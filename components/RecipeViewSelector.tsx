import { Grid, List } from '@air/icons'
import { transparentize } from 'polished'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
	recipeListView,
	setRecipeListView,
} from '../redux/slices/recipeListSlice'

export const RecipeViewSelector: React.FC = () => {
	const dispatch = useDispatch()
	const view = useSelector(recipeListView)

	return (
		<StyledButtonWrapper>
			<StyledViewButton
				active={view === 'card'}
				onClick={() => dispatch(setRecipeListView('card'))}
			>
				<Grid width='21' fill='rgba(0,0,0,0.7)' />
			</StyledViewButton>
			<StyledViewButton
				active={view === 'table'}
				onClick={() => dispatch(setRecipeListView('table'))}
			>
				<List width='26' fill='rgba(0,0,0,0.7)' />
			</StyledViewButton>
		</StyledButtonWrapper>
	)
}

const StyledButtonWrapper = styled.div`
	display: flex;
	margin-bottom: 2rem;
`

const StyledViewButton = styled.button<{ active: boolean }>`
	all: unset;
	background: white;
	border-radius: 7px;
	padding: 0.15rem 0.5rem;
	width: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: thin solid rgba(0, 0, 0, 0.2);
	&:first-child {
		border-radius: 7px 0 0 7px;
	}
	&:last-child {
		border-radius: 0 7px 7px 0;
	}
	${p =>
		p.active
			? `
			background-color: ${transparentize(0.5, p.theme.color.delta)};
			box-shadow: inset 0 0 3px rgba(0,0,0,0.2);
			`
			: null}
`
