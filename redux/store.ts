import { configureStore } from '@reduxjs/toolkit'
import { testSlice } from './slices/testSlice'
import { recipesSlice } from './slices/recipesSlice'
import { userSlice } from './slices/userSlice'

const store = configureStore({
	reducer: {
		test: testSlice.reducer,
		recipes: recipesSlice.reducer,
		user: userSlice.reducer,
	},
	devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
