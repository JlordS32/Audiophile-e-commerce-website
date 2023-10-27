// rrd imports
import { Outlet } from 'react-router-dom';

// component imports
import Navbar from '../components/Navbar';
const Main = () => {
	return (
		<div className='layout'>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Main;
