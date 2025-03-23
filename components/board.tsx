'use client';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectIssues, updateIssueState } from '@/redux/issuesSlice';

export default function Board() {
	const dispatch = useAppDispatch();
	const issues = useAppSelector(selectIssues) as Issue[];

	const [draggedIssue, setDraggedIssue] = useState<Issue | null>(null);

	// Columns
	const columns = {
		todo: issues.filter((issue) => issue.state === 'open'),
		inProgress: issues.filter((issue) => issue.state === 'inProgress'),
		done: issues.filter((issue) => issue.state === 'closed')
	};

	// Drag Start
	const handleDragStart = (issue: Issue) => {
		setDraggedIssue(issue);
	};

	// Drop Handler
	const handleDrop = (newState: 'open' | 'closed' | 'inProgress') => {
		if (draggedIssue) {
			dispatch(updateIssueState({ id: draggedIssue.id, state: newState }));
			setDraggedIssue(null);
		}
	};

	return (
		<div className='grid grid-cols-3 gap-4 p-4'>
			{/* ToDo Column */}
			<div
				className='p-4 bg-gray-300 rounded-md shadow-md'
				onDragOver={(e) => e.preventDefault()}
				onDrop={() => handleDrop('open')}
			>
				<h5 className='font-bold text-lg text-center'>To Do</h5>
				<div className='flex flex-col gap-2'>
					{columns.todo.map((issue) => (
						<div
							key={issue.id}
							draggable
							onDragStart={() => handleDragStart(issue)}
							className='p-2 bg-white rounded-md shadow cursor-grab'
						>
							{issue.title}
						</div>
					))}
				</div>
			</div>

			{/* In Progress Column */}
			<div
				className='p-4 bg-yellow-100 rounded-md shadow-md'
				onDragOver={(e) => e.preventDefault()}
				onDrop={() => handleDrop('inProgress')}
			>
				<h5 className='font-bold text-lg text-center'>In Progress</h5>
				<div className='flex flex-col gap-2'>
					{columns.inProgress.map((issue) => (
						<div
							key={issue.id}
							draggable
							onDragStart={() => handleDragStart(issue)}
							className='p-2 bg-white rounded-md shadow cursor-grab'
						>
							{issue.title}
						</div>
					))}
				</div>
			</div>

			{/* Done Column */}
			<div
				className='p-4 bg-green-200 rounded-md shadow-md'
				onDragOver={(e) => e.preventDefault()}
				onDrop={() => handleDrop('closed')}
			>
				<h5 className='font-bold text-lg text-center'>Done</h5>
				<div className='flex flex-col gap-2'>
					{columns.done.map((issue) => (
						<div
							key={issue.id}
							draggable
							onDragStart={() => handleDragStart(issue)}
							className='p-2 bg-white rounded-md shadow cursor-grab'
						>
							{issue.title}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
