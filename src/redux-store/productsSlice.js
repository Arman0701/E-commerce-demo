import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "productsSlice",
	initialState: {
		value: []
	},
	reducers: {
		initProducts(state, {payload}) {
			state.value = payload
		},
	},
})

export const { initProducts } = productsSlice.actions
export default productsSlice.reducer