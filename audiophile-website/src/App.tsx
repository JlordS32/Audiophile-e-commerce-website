// rrd import
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';

// context
import { ShoppingCartProvider } from './context/ShoppingCartContext';

// component imports
import Main from './layout/Main';
import Error from './pages/Error';
import Home from './pages/Home';
import Headphones from './pages/Headphones';
import Speakers from './pages/Speakers';
import Earphones from './pages/Earphones';
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
import PageNotFound from './pages/PageNotFound';

// library
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const App = () => {
	AOS.init();

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Main />,
			errorElement: <Error />,
			children: [
				{
					index: true,
					element: <Home />,
					errorElement: <Error />,
				},
				{
					path: 'headphones',
					element: <Headphones />,
					errorElement: <Error />,
				},
				{
					path: 'speakers',
					element: <Speakers />,
					errorElement: <Error />,
				},
				{
					path: 'earphones',
					element: <Earphones />,
					errorElement: <Error />,
				},
				{
					path: 'product/:productName',
					element: <ProductPage />,
					errorElement: <Error />,
				},
				{
					path: 'checkout',
					element: <Checkout />,
					errorElement: <Error />,
				}
			],
		},
		{
			path: '*',
			element: <PageNotFound />,
		}
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
