import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { createAppAsyncThunk } from './hooks';

export const issuesSlice = createSlice({
	name: 'issues',
	initialState: {
		issues: []
	},
	reducers: {}
});

export default issuesSlice.reducer;

export const getIssues = createAppAsyncThunk(
	'issues/getIssues',
	async (url: string) => {
		const newUrl = url.split('/');
		const repo = newUrl[newUrl.length - 1];
		const user = newUrl[newUrl.length - 2];
		const response = await fetch(
			`https://api.github.com/repos/${user}/${repo}/issues`
		);
		const data = await response.json();
		return data;
	}
);

export const selectIssues = (state: RootState) => state.issues.issues;
