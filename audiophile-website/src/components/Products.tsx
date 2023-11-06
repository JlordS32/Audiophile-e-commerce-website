// rrd imports
import { Link as RRDLink } from 'react-router-dom';

import styles from '../styles/products.module.css';
import Link from './Link';

const Products = () => {
	return (
		<section className={styles.productsContainer}>
			<div
				className={styles.productHeadPhones}
				data-aos='fade-in'
				data-aos-duration='1000'
			>
				<span className='text--h6'>Headphones</span>
				<RRDLink to='/headphones'>
					<Link>Shop</Link>
				</RRDLink>
			</div>
			<div
				className={styles.productSpeakers}
				data-aos='fade-in'
				data-aos-duration='1000'
			>
				<span className='text--h6'>Speakers</span>
				<RRDLink to='/speakers'>
					<Link>Shop</Link>
				</RRDLink>
			</div>
			<div
				className={styles.productEarphones}
				data-aos='fade-in'
				data-aos-duration='1000'
			>
				<span className='text--h6'>Earphones</span>
				<RRDLink to='/earphones'>
					<Link>Shop</Link>
				</RRDLink>
			</div>
		</section>
	);
};

export default Products;
