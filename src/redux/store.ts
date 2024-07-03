import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./states/auth";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const reducer = combineReducers({
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		const defaultMiddleware = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		});

		return defaultMiddleware;
	},
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
