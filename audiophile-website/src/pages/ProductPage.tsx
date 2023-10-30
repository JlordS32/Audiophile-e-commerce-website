// react
import { useEffect } from 'react';

// rrd
import { useParams, useNavigate } from 'react-router-dom';

// styles
import styles from '../styles/productPage.module.css';

// components
import Footer from '../components/Footer';
import Review from '../components/Review';
import Form from '../components/Form';
import Button from '../components/Button';
import { formatCurrency } from '../utility/utilities';

// data imports
import data from '../data/data.json';

const ProductPage = () => {
	// rrd hooks
	const { productName } = useParams();
	const navigate = useNavigate();

	// filtering data
	const productData = data.filter((data) => data.slug === productName)[0];

	// destructuring data
	const {
		features,
		categoryImage,
		new: isNewProduct,
		name,
		description,
		price,
		includes,
	} = productData;

	const featureDescription = features.split('\n');

	return (
		<div className={styles.productPage}>
			<div className='d-flex justify-content-center'>
				<div className={styles.goBack}>
					<span onClick={() => navigate(-1)}>Go Back</span>
				</div>
			</div>

			<main>
				<section className={styles.productContainer}>
					<article className={styles.product}>
						<div className={styles.imgContainer}>
							<img
								src={categoryImage.desktop}
								alt={productName}
								style={{
									width: '100%',
								}}
							/>
						</div>

						<div className={styles.productDesc}>
							{isNewProduct && (
								<p
									className='overline'
									style={{
										color: 'var(--primary)',
									}}
								>
									New Product
								</p>
							)}

							<h2 className={`${styles.title}`}>{name}</h2>

							<div className={styles.desc}>{description}</div>

							<div className={styles.price}>{formatCurrency(price)}</div>

							<div className={styles.addToCart}>
								<Form.Counter />
								<Button>Add to cart</Button>
							</div>
						</div>
					</article>

					<article className={styles.productDetails}>
						<div className={styles.features}>
							<h3 className='text--h3'>Features</h3>
							<div
								className='description'
								style={{
									display: 'flex',
									gap: '1rem 0',
									flexDirection: 'column',
								}}
							>
								{featureDescription.map((desc, index) => {
									if (desc !== '') {
										return <p key={index}>{desc}</p>;
									}
								})}
							</div>
						</div>

						<div className={styles.inTheBox}>
							<h3 className='text--h3'>In the box</h3>
							<ul>
								{includes.map((item) => {
									return (
										<li>
											<span className={styles.quantity}>{item.quantity}x</span>
											<span className={styles.item}>{item.item}</span>
										</li>
									);
								})}
							</ul>
						</div>
					</article>

					<article>
						<div className={styles.showcaseGallery}>
							<div
								className={styles.showcaseImg}
								style={{
									backgroundImage: `url(../../product-${productName}/desktop/image-gallery-1.jpg)`,
								}}
							></div>
							<div
								className={styles.showcaseImg}
								style={{
									backgroundImage: `url(../../product-${productName}/desktop/image-gallery-2.jpg)`,
								}}
							></div>
							<div
								className={styles.showcaseImg}
								style={{
									backgroundImage: `url(../../product-${productName}/desktop/image-gallery-3.jpg)`,
								}}
							></div>
						</div>
					</article>
				</section>

				<section>
					<Review />
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default ProductPage;
