// rrd import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// context
import { ShoppingCartProvider } from './context/ShoppingCartContext';

// component imports
import Main from './layout/Main';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Headphones from './pages/Headphones';
import Speakers from './pages/Speakers';
import Earphones from './pages/Earphones';

// library
import { ToastContainer } from 'react-toastify';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Main />,
			errorElement: <NotFound />,
			children: [
				{
					index: true,
					element: <Home />,
					errorElement: <NotFound />,
				},
				{
					path: 'headphones',
					element: <Headphones />,
					errorElement: <NotFound />,
				},
				{
					path: 'speakers',
					element: <Speakers />,
					errorElement: <NotFound />,
				},
				{
					path: 'earphones',
					element: <Earphones />,
					errorElement: <NotFound />,
				},
			],
		},
	]);

	return (
		<ShoppingCartProvider>
			<div className='app'>
				<RouterProvider router={router} />
				<ToastContainer />
			</div>
		</ShoppingCartProvider>
	);
};

export default App;
