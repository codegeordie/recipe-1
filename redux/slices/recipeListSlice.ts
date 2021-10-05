import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Recipe } from '../../server/interfaces'

const initialState: {
	recipeArray: Recipe[]
	currentRecipe: Recipe | undefined
} = {
	recipeArray: [],
	currentRecipe: undefined,
}

export const recipeListSlice = createSlice({
	name: 'recipeList',
	initialState,
	reducers: {
		setCurrentRecipe: (state, action) => {
			state.currentRecipe = action.payload
		},
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
	setCurrentRecipe,
	clearRecipeArray,
	setRecipeArray,
	appendRecipeArray,
	setFavoriteAction,
} = recipeListSlice.actions

export const recipeArray = (state: RootState) => state.recipeList.recipeArray
export const currentRecipe = (state: RootState) =>
	state.recipeList.currentRecipe
