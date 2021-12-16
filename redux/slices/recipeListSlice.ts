import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Recipe, Tag } from '../../server/interfaces'
import { isEqual } from 'lodash'

const initialState: {
	recipeArray: Recipe[]
	currentRecipe: Recipe | undefined
	possibleTags: Tag[]
	recipeSortField: string | undefined
	recipeSortDirection: 'ascending' | 'descending' | undefined
	recipeListView: 'card' | 'table'
	recipeListColumns: number | undefined
} = {
	recipeArray: [],
	currentRecipe: undefined,
	possibleTags: [],
	recipeSortField: undefined,
	recipeSortDirection: undefined,
	recipeListView: 'card',
	recipeListColumns: undefined,
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
		setCurrentRecipe: (state, action) => {
			state.currentRecipe = action.payload
		},
		setPossibleTags: (state, action) => {
			if (!isEqual(state.possibleTags, action.payload)) {
				state.possibleTags = action.payload
			}
		},
		setFavoriteAction: (state, action) => {
			state.recipeArray.forEach(recipe => {
				if (recipe._id === action.payload.recipeId)
					recipe.favorited = action.payload.setFavBool
			})
		},
		setRecipeSortField: (state, action) => {
			state.recipeSortField = action.payload
		},
		setRecipeSortDirection: (state, action) => {
			state.recipeSortDirection = action.payload
		},
		setRecipeListView: (state, action) => {
			state.recipeListView = action.payload
		},
		setRecipeListColumns: (state, action) => {
			state.recipeListColumns = action.payload
		},
	},
})

export const {
	setPossibleTags,
	setCurrentRecipe,
	clearRecipeArray,
	setRecipeArray,
	appendRecipeArray,
	setFavoriteAction,
	setRecipeSortField,
	setRecipeSortDirection,
	setRecipeListView,
	setRecipeListColumns,
} = recipeListSlice.actions

export const recipeArray = (state: RootState) => state.recipeList.recipeArray
export const currentRecipe = (state: RootState) =>
	state.recipeList.currentRecipe
export const possibleTags = (state: RootState) => state.recipeList.possibleTags
export const recipeSortField = (state: RootState) =>
	state.recipeList.recipeSortField
export const recipeSortDirection = (state: RootState) =>
	state.recipeList.recipeSortDirection
export const recipeListView = (state: RootState) =>
	state.recipeList.recipeListView
export const recipeListColumns = (state: RootState) =>
	state.recipeList.recipeListColumns
