import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './issuesSlice';

export const store = configureStore({
	reducer: {
		issues: issuesReducer
	}
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
