import { createSlice } from '@reduxjs/toolkit'

// const initialState = [
// 	{
// 		value: 1,
// 	},
// ]

export const testSlice = createSlice({
	name: 'test',
	initialState: {
		value: 0,
	},
	reducers: {
		increment: state => {
			state.value += 1
		},
	},
})

//export default testSlice.reducer

export const { increment } = testSlice.actions

//export const selectCount = state => state.test.value
