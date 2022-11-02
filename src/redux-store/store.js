import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import categorySlice from "./categorySlice";
import productsSlice from "./productsSlice";

export default configureStore({
	reducer: {
		productsSlice,
		currentUserSlice,
		categorySlice,
	}
})