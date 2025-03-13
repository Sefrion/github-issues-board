import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const issuesSlice = createSlice({
	name: 'issues',
	initialState: {
		issues: []
	},
	reducers: {}
});

export default issuesSlice.reducer;

export const selectIssues = (state: RootState) => state.issues.issues;
