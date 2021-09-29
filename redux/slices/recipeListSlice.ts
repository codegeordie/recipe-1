import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Recipe } from '../../server/interfaces'

const initialState: { recipeArray: Recipe[] } = {
	recipeArray: [],
}

export const recipeListSlice = createSlice({
	name: 'recipeList',
	initialState,
	reducers: {
		clearRecipeArray: state => {
			state.recipeArray = []
		},
		setRecipeArray: (state, action) => {
			state.recipeArray = action.payload
		},
		appendRecipeArray: (state, action) => {
			state.recipeArray = [...state.recipeArray, ...action.payload]
		},
		setFavoriteAction: (state, action) => {
			state.recipeArray.forEach(recipe => {
				if (recipe._id === action.payload.recipeId)
					recipe.favorited = action.payload.setFavBool
			})
		},
	},
})

export const {
	clearRecipeArray,
	setRecipeArray,
	appendRecipeArray,
	setFavoriteAction,
} = recipeListSlice.actions

export const recipeArray = (state: RootState) => state.recipeList.recipeArray
