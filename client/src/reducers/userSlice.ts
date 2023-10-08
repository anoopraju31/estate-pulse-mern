import { createSlice } from '@reduxjs/toolkit'

export interface User {
	success: boolean
	id: string
	username: string
	email: string
	avatar: string
	createdAt: string
	updatedAt: string
}

interface UserState {
	currentUser: User | null
	error: string | null
	loading: boolean
}

const initialState: UserState = {
	currentUser: null,
	error: null,
	loading: false,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload
			state.loading = false
			state.error = null
		},
		signInFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		signOutUserStart: (state) => {
			state.loading = true
		},
		signOutUserSuccess: (state) => {
			state.currentUser = null
			state.loading = false
			state.error = null
		},
		signOutUserFailure: (state, action) => {
			state.error = action.payload
			state.loading = false
		},
		updateUserStart: (state) => {
			state.loading = true
		},
		updateUserSuccess: (state, action) => {
			state.currentUser = action.payload
			state.loading = false
			state.error = null
		},
		updateUserFailure: (state, action) => {
			state.error = action.payload
			state.loading = false
		},
	},
})

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	signOutUserFailure,
	signOutUserSuccess,
	signOutUserStart,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
} = userSlice.actions

export default userSlice.reducer
