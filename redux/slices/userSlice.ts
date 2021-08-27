import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const userSlice = createSlice({
	name: 'user',
	initialState: { currency: { id: 'USD', value: 'US Dollars' } },
	reducers: {
		changeCurrency: (state, action) => {
			state.currency = action.payload
		},
	},
})

export const { changeCurrency } = userSlice.actions

export const userCurrencyPreference = (state: RootState) => state.user.currency
