import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { testSlice } from './slices/testSlice'
import { recipesSlice } from './slices/recipesSlice'
import { userSlice } from './slices/userSlice'
import { recipeListSlice } from './slices/recipeListSlice'

const reducers = combineReducers({
	test: testSlice.reducer,
	recipes: recipesSlice.reducer,
	user: userSlice.reducer,
	recipeList: recipeListSlice.reducer,
})

const persistedReducer = persistReducer(
	{
		key: 'root',
		version: 1,
		storage,
		whitelist: ['user'],
	},
	reducers
)

// const store = configureStore({
// 	reducer: {
// 		test: testSlice.reducer,
// 		recipes: recipesSlice.reducer,
// 		user: userSlice.reducer,
// 	},
// 	devTools: true,
// })

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
