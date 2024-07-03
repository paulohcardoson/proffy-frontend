import { IProfile } from "@base/types/profile";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
	isAuthenticated: boolean;
	token: string | null;
	profile: IProfile | null;
}

// Define the initial state using that type
const initialState: IAuthState = {
	isAuthenticated: false,
	token: null,
	profile: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logIn: (
			state,
			action: PayloadAction<{ token: string; profile: IProfile }>,
		) => {
			const { token, profile } = action.payload;

			state.isAuthenticated = true;
			state.token = token;
			state.profile = profile;
		},
		logOut: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.profile = null;
		},
	},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
