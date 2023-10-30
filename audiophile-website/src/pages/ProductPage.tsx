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

const ProductPage = ({ newProduct = false }: ProductPageType) => {
	const { productName } = useParams();
	const navigate = useNavigate();

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
						<div className={styles.imgContainer}>
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

							<h2 className={`${styles.title} text--h2`}>
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

					<article>
						<div className='features'>
							<h3 className='text--h3'>Features</h3>
							<p>
								Featuring a genuine leather head strap and premium earcups,
								these headphones deliver superior comfort for those who like to
								enjoy endless listening. It includes intuitive controls designed
								for any situation. Whether you’re taking a business call or just
								in your own personal space, the auto on/off and pause features
								ensure that you’ll never miss a beat.<br></br>
								<br></br> The advanced Active Noise Cancellation with built-in
								equalizer allow you to experience your audio world on your
								terms. It lets you enjoy your audio in peace, but quickly
								interact with your surroundings when you need to. Combined with
								Bluetooth 5. 0 compliant connectivity and 17 hour battery life,
								the XX99 Mark II headphones gives you superior sound,
								cutting-edge technology, and a modern design aesthetic.
							</p>
						</div>

						<div className={styles.inTheBox}>
							<h3 className='text--h3'>In the box</h3>
							<ul>
								<li>
									<span className='standout'>1x</span> Headphone Unit
								</li>
								<li>
									<span className='standout'>2x</span> Replacement Earcups
								</li>
								<li>
									<span className='standout'>1x</span> User Manual
								</li>
								<li>
									<span className='standout'>1x</span> 3.5mm 5m Audio Cable
								</li>
								<li>
									<span className='standout'>1x</span> Travel Bag
								</li>
							</ul>
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