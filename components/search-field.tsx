'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/redux/hooks';
import { getIssues } from '@/redux/issuesSlice';

export default function SearchField() {
	const [url, setUrl] = useState<string>('');
	const dispatch = useAppDispatch();

	function loadIssues() {
		dispatch(getIssues(url));
		setUrl('');
	}

	return (
		<div className='flex'>
			<Input
				type='url'
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder='Enter repo URL'
				className='border border-gray-300'
			/>
			<Button className='ml-2' type='button' onClick={loadIssues}>
				Load issues
			</Button>
		</div>
	);
}
