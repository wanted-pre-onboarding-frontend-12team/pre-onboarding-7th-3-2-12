import { PropsWithChildren } from 'react';
import { Sidebar, Header, Footer } from '@src/components';

const Layout = (props: PropsWithChildren) => {
	return (
		<div className="flex w-screen h-screen max-h-screen max-w-screen">
			<Sidebar />
			<div className="flex flex-col w-[calc(100vw_-_240px)] relative">
				<Header />
				<div className="h-[calc(100vh_-_160px)] overflow-auto bg-gray-100 p-8">{props.children}</div>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
