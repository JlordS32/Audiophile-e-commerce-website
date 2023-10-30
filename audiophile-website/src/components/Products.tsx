// rrd imports
import { Link as RRDLink } from 'react-router-dom';

import styles from '../styles/products.module.css';
import Link from './Link';

const Products = () => {
	return (
		<section className={styles.productsContainer}>
			<div className={styles.productHeadPhones}>
				<span className='text--h6'>Headphones</span>
				<RRDLink to='/headphones'>
					<Link>Shop</Link>
				</RRDLink>
			</div>
			<div className={styles.productSpeakers}>
				<span className='text--h6'>Speakers</span>
				<RRDLink to='/speakers'>
					<Link>Shop</Link>
				</RRDLink>
			</div>
			<div className={styles.productEarphones}>
				<span className='text--h6'>Earphones</span>
				<RRDLink to='/earphones'>
					<Link>Shop</Link>
				</RRDLink>
			</div>
		</section>
	);
};

export default Products;
