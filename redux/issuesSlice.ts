import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { createAppAsyncThunk } from './hooks';

interface initialState {
	issues: Issue[];
	status: string;
	error: string;
}
const initialState: initialState = {
	issues: [],
	status: '',
	error: ''
};

export const issuesSlice = createSlice({
	name: 'issues',
	initialState,
	reducers: {
		updateIssueState: (
			state,
			action: PayloadAction<{
				id: number;
				state: 'open' | 'closed' | 'inProgress';
			}>
		) => {
			const issue = state.issues.find((issue) => issue.id === action.payload.id);
			if (issue) {
				issue.state = action.payload.state;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getIssues.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getIssues.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.issues = action.payload;
			})
			.addCase(getIssues.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Unknown Error';
			});
	}
});

export default issuesSlice.reducer;

export const { updateIssueState } = issuesSlice.actions;

export const getIssues = createAppAsyncThunk(
	'issues/getIssues',
	async (url: string) => {
		try {
			const newUrl = url.split('/');
			const repo = newUrl[newUrl.length - 1];
			const user = newUrl[newUrl.length - 2];
			const response = await fetch(
				`https://api.github.com/repos/${user}/${repo}/issues`
			);
			const data = await response.json();
			const issues: Issue[] = [];
			for (const issue of data) {
				if (issue.assignee !== null) {
					issue.state = 'inProgress';
					issues.push(issue);
				} else {
					issues.push(issue);
				}
			}
			return issues;
		} catch (error) {
			console.error('Failed to fetch issues: ', error);
			throw error;
		}
	}
);

export const selectIssues = (state: RootState) => state.issues.issues;
