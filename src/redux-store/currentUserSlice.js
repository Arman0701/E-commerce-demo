import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
	name: "currentUserSlice",
	initialState: {
		value: {},
		cartTotalPrice: 0,
	},
	reducers: {
		initUser(state, {payload}) {
			state.value = {...payload, cart: [], addressToOrder: ""}
		},
		addToCart(state, {payload}) {
			state?.value?.cart.push(payload)
		},
		getTotalPrice(state) {
			state.cartTotalPrice = state?.value?.cart?.reduce((prev, current) => {
				return (current?.price * current?.quantity) + prev
			}, 0)
			state.cartTotalPrice = state.cartTotalPrice?.toFixed(2)
		},
		increaseQuantity(state, {payload}) {
			state.value.cart = state.value.cart.map(product => {
				if (product.id === payload) {
					return { ...product, quantity: product.quantity + 1}
				}
				return product
			})
		},
		decreaseQuantity(state, {payload}) {
			state.value.cart = state.value.cart.map(product => {
				if (product.id === payload) {
					return { ...product, quantity: product.quantity - 1}
				}
				return product
			})
		},
		removeFromCart(state, {payload}) {
			state.value.cart = state.value.cart.filter(item => item.id !== payload)
		},
		removeCurrentUser(state) {
			state.value = {}
		}
	}
})

export const {
	initUser,
	addToCart,
	getTotalPrice,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	removeCurrentUser
} = currentUserSlice.actions
export default currentUserSlice.reducer