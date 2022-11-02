import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
	name: "categorySlice",
	initialState: {
		value: []
	},
	reducers: {
		initCurrentCategory(state, {payload}) {
			state.value = payload;
		},
	}
})

export const { initCurrentCategory } = categorySlice.actions
export default categorySlice.reducer