import { PropsWithChildren } from 'react'
import { Sidebar, Header, Footer } from '@src/components';

const Layout = (props: PropsWithChildren) => {
  return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex-1 flex-col">
				<Header />
				<div className="mt-20 p-8 h-[calc(100vh_-_160px)] bg-gray-100">
					{props.children}
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default Layout