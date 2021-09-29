import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
	showOnlyFavorites: false,
	showOnlyCreated: false,
}

export const recipesSlice = createSlice({
	name: 'recipes',
	initialState,
	reducers: {
		toggleShowCreated: state => {
			state.showOnlyCreated = !state.showOnlyCreated
		},
		toggleShowFavorites: state => {
			state.showOnlyFavorites = !state.showOnlyFavorites
		},
	},
})

export const { toggleShowCreated, toggleShowFavorites } = recipesSlice.actions

export const createdBool = (state: RootState) => state.recipes.showOnlyCreated
export const showFavorites = (state: RootState) =>
	state.recipes.showOnlyFavorites
