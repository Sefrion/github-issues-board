import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import StoreProvider from '@/app/store-provider';
import './globals.css';

const poppins = Poppins({
	weight: ['400', '600'],
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Github issues board',
	description: 'View Github issues in a board'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.className} antialiased`}>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
