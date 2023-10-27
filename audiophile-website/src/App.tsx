import Button from './components/Button';
import Form from './components/Form';

const App = () => {
	return (
		<div className='app'>
			<div className='container' style={{
				padding: '10rem',
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem 0'
			}}>
				<Form.Radio
					value='money'
					label='e-Money'
				/>
				<Form.Text placeholder='Insert your name' label='Name'/>
			</div>
		</div>
	);
};

export default App;
