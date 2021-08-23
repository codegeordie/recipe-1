import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const userSlice = createSlice({
	name: 'user',
	initialState: { currency: 'USD' },
	reducers: {
		changeCurrency: (state, action) => {
			state.currency = action.payload
		},
	},
})

export const { changeCurrency } = userSlice.actions

export const userCurrencyPreference = (state: RootState) => state.user.currency
