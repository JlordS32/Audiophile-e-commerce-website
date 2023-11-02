import { Link, useNavigate } from 'react-router-dom';

// styles
import styles from '../styles/error.module.css';

// library imports
import { HomeIcon } from '@heroicons/react/24/solid';
import Button from '../components/Button';

const PageNotFound = () => {
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
				404 Page Not Found
			</p>
			<div
				className='d-flex'
				style={{
					gap: '0 1rem',
				}}
			>
				<Button
					variant='dark-outline'
					onClick={() => navigate(-1)}
				>
					Go Back
				</Button>
				<Link to='/'>
					<Button variant='dark'>
						<div
							className='d-flex justify-content-center align-items-center'
							style={{
								gap: '0 0.5rem',
							}}
						>
							<HomeIcon width={20} />
							Go Home
						</div>
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
