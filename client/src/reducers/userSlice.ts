import { createSlice } from '@reduxjs/toolkit'

interface User {
	success: boolean
	id: string
	username: string
	email: string
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
	},
})

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer
