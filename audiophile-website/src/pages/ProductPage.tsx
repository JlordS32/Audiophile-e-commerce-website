import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/productPage.module.css';

// components
import Footer from '../components/Footer';
import Review from '../components/Review';
import Form from '../components/Form';
import Button from '../components/Button';
import { formatCurrency } from '../utility/utilities';

// typees
type ProductPageType = {
	newProduct?: boolean;
};

const ProductPage = ({ newProduct = true }: ProductPageType) => {
	const { productName } = useParams();
	const navigate = useNavigate();

	const featuresDescription =
		'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat. \n The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5.0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.';

	const descriptions = featuresDescription.split('\n');

	const imgUrl = `../../product-${productName}/desktop/image-product.jpg`;

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
						<div className={styles.imgContainer} style={{
							backgroundImage: `url${imgUrl}`
						}}>
							<img
								src={imgUrl}
								alt={productName}
								style={{
									width: '100%',
								}}
							/>
						</div>

						<div className={styles.productDesc}>
							{newProduct && (
								<p
									className='overline'
									style={{
										color: 'var(--primary)',
									}}
								>
									New Product
								</p>
							)}

							<h2 className={`${styles.title}`}>
								XX99 Mark ii headphones
							</h2>

							<div className={styles.desc}>
								The new XX99 Mark II headphones is the pinnacle of pristine
								audio. It redefines your premium headphone experience by
								reproducing the balanced depth and precision of studio-quality
								sound.
							</div>

							<div className={styles.price}>{formatCurrency(2999)}</div>

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
								{descriptions.map((desc, index) => {
									return <p key={index}>{desc}</p>;
								})}
							</div>
						</div>

						<div className={styles.inTheBox}>
							<h3 className='text--h3'>In the box</h3>
							<ul>
								<li>
									<span className={styles.quantity}>1x</span>
									<span className={styles.item}>Headphone Unit</span>
								</li>
								<li>
									<span className={styles.quantity}>2x</span>
									<span className={styles.item}>Replacement Earcups</span>
								</li>
								<li>
									<span className={styles.quantity}>1x</span>
									<span className={styles.item}>User Manual</span>
								</li>
								<li>
									<span className={styles.quantity}>1x</span>
									<span className={styles.item}>3.5mm 5m Audio Cable</span>
								</li>
								<li>
									<span className={styles.quantity}>1x</span>
									<span className={styles.item}>Travel Bag</span>
								</li>
							</ul>
						</div>
					</article>

					<article>
						<div className={styles.showcaseGallery}>
							<div className={styles.showcaseImg} style={{
								backgroundImage: `url(../../product-${productName}/desktop/image-gallery-1.jpg)`
							}}></div>
							<div className={styles.showcaseImg} style={{
								backgroundImage: `url(../../product-${productName}/desktop/image-gallery-2.jpg)`
							}}></div>
							<div className={styles.showcaseImg} style={{
								backgroundImage: `url(../../product-${productName}/desktop/image-gallery-3.jpg)`
							}}></div>
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
