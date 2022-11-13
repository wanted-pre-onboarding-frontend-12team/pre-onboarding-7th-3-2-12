import { Sidebar, Header, Footer } from '../../components/layout';

const Dashboard = () => {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex-1 flex-col">
				<Header />
				<div className="mt-20 h-[calc(100vh_-_160px)] bg-gray-100">
					<p>hi</p>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Dashboard;
