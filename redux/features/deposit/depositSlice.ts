import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	method: {
		username: '',
		wallets: [],
	},
};

export const depositSlice = createSlice({
	name: 'deposit',
	initialState,
	reducers: {
		addDepositMethod: (state, action) => {
			state.method = {
				username: action.payload.username,
				wallets: action.payload.wallets,
			};
		},

		removeDepositMethod: (state) => {
			state.method = {
				username: '',
				wallets: [],
			};
		},
	},
});

export const { addDepositMethod, removeDepositMethod } = depositSlice.actions;
export default depositSlice.reducer;
