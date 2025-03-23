type Issue<T = unknown> = {
	id: number;
	title: string;
	state: 'open' | 'closed' | 'inProgress';
	assignee: string | null;
	comments: number;
	extra?: T;
};
