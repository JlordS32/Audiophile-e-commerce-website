// rrd imports
import { Outlet, ScrollRestoration } from 'react-router-dom';

// component imports
import Navbar from '../components/Navbar';
const Main = () => {
	return (
		<div className='layout'>
			<Navbar />
			<main>
				<Outlet />
			</main>
         <ScrollRestoration />
		</div>
	);
};

export default Main;
