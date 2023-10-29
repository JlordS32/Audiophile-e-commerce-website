// styles
import styles from '../styles/showProducts.module.css';
import Button from './Button';

// libraries
import slugify from 'slugify';

// rrd imports
import { Link as RrdLink } from 'react-router-dom';

type ShowProductProps = {
	imgUrl: string;
	description: string;
	title: string;
	newProduct?: true | false;
	reverseOrder?: true | false;
};

const ShowProduct = ({
	imgUrl,
	description,
	title,
	newProduct = false,
	reverseOrder = false,
}: ShowProductProps) => {
	// slugify title for url
	const slugifiedTitle = slugify(title, {
		replacement: '-',
		lower: true,
	});
	return (
		<div className={styles.container}>
			<div className={styles.product}>
				<div
					className={styles.imgContainer}
					style={{
						backgroundImage: `url(${imgUrl})`,
						order: reverseOrder ? '1' : '0',
					}}
				></div>
				<div
					className={styles.productDesc}
					style={{
						order: reverseOrder ? '0' : '1',
						marginLeft: reverseOrder ? '' : 'auto',
						marginRight: reverseOrder ? 'auto' : '',
					}}
				>
					{newProduct && (
						<span
							className='overline'
							style={{
								color: 'var(--primary)',
								marginBottom: '1rem',
							}}
						>
							New Product
						</span>
					)}
					<h2 className='text--h2'>{title}</h2>
					<p>{description}</p>
					<RrdLink to={`/product/${slugifiedTitle}`}>
						<Button>See Product</Button>
					</RrdLink>
				</div>
			</div>
		</div>
	);
};

export default ShowProduct;
