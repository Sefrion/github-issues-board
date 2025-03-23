import Board from '@/components/board';
import SearchField from '@/components/search-field';

export default function Home() {
	return (
		<main className='container mx-auto p-4'>
			<SearchField />
			<br />
			<Board />
		</main>
	);
}
