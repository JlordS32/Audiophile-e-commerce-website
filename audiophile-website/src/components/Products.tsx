import styles from '../styles/products.module.css';
import Link from './Link';

const Products = () => {
	return (
		<div
			className='d-flex'
			style={{
				justifyContent: 'center',
				gap: '0 1.9rem',
			}}
		>
			<div className={styles.productHeadPhones}>
				<span className='text--h6'>Headphones</span>
				<Link>Shop</Link>
			</div>
			<div className={styles.productSpeakers}>
				<span className='text--h6'>Speakers</span>
				<Link>Shop</Link>
			</div>
			<div className={styles.productEarphones}>
				<span className='text--h6'>Earphones</span>
				<Link>Shop</Link>
			</div>
		</div>
	);
};

export default Products;
