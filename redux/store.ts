import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import appReducer from './features/appSlice';
import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';
import miningReducer from './features/mining/miningSlice';
import colorThemReducer from './colorThemSlice';
import depositReducer from './features/deposit/depositSlice';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth'],
};

export const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	app: appReducer,
	auth: authReducer,
	mining: miningReducer,
	colorThem: colorThemReducer,
	deposit: depositReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware);
	},
});
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
