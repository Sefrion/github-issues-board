'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchField() {
	const [url, setUrl] = useState('');

	function loadIssues() {
		//
	}

	return (
		<div className='flex'>
			<Input
				type='url'
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder='Enter repo URL'
			/>
			<Button type='button' onClick={loadIssues}>
				Load issues
			</Button>
		</div>
	);
}
