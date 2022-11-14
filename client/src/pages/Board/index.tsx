<<<<<<< HEAD
import { Sidebar, Header, Footer } from '../../components';
import BankAccount from '../BankAccount';

const Dashboard = () => {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex-1 flex-col">
				<Header />
				<div className="mt-20 h-[calc(100vh_-_160px)] bg-gray-100">
					<BankAccount />
				</div>
				<Footer />
			</div>
		</div>
=======
import { Layout } from '@src/components';

const Dashboard = () => {
	return (
		<Layout></Layout>
>>>>>>> develop
	);
};

export default Dashboard;
