import { useRouteError, Link, useNavigate } from 'react-router-dom';

// styles
import styles from '../styles/error.module.css';

// library imports
import { HomeIcon } from '@heroicons/react/24/solid';
import Button from '../components/Button';

interface Error {
	message?: string;
	statusText?: string;
}
const NotFound = () => {
	const error = useRouteError() as Error;
	const navigate = useNavigate();

	return (
		<div className={styles.error}>
			<h1 className='text--h1'>Uh oh! We've got a problem!</h1>
			<p
				className='text--h3'
				style={{
					padding: '3rem',
				}}
			>
				{error.message || error.statusText}
			</p>
			<div className='d-flex' style={{
				gap: '0 1rem'
			}}>
				<Button variant='dark-outline' onClick={() => navigate(-1)}>Go Back</Button>
				<Link
					to='/'
					className='btn btn--dark'
				>
					<Button variant='dark'>
						<div className='d-flex justify-content-center align-items-center' style={{
							gap: '0 0.5rem'
						}}>
							<HomeIcon width={20} />
							Go Home
						</div>
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
