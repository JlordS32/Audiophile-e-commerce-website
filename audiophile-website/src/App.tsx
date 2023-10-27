import Form from './components/Form';
import ButtonLink from './components/Link';

// context
import { ShoppingCartProvider } from './context/ShoppingCartContext';

const App = () => {
	return (
		<ShoppingCartProvider>
			<div className='app'>
				<div
					className='container'
					style={{
						padding: '10rem',
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem 0',
					}}
				>
				</div>
			</div>
		</ShoppingCartProvider>
	);
};

export default App;
