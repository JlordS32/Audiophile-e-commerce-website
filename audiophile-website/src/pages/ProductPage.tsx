import { ReactNode } from 'react';

// rrd
import { useParams, useNavigate, Link as RRDLink } from 'react-router-dom';

// styles
import styles from '../styles/productPage.module.css';

// components
import Footer from '../components/Footer';
import Review from '../components/Review';
import Form from '../components/Form';
import Button from '../components/Button';

// utilities
import { formatCurrency, getBestRecommended } from '../utility/utilities';

// data imports
import data from '../data/data.json';
import Products from '../components/Products';

// images
import errorImg from '../assets/failedLoadingImg.jpg';
import { UseShoppingCart } from '../context/ShoppingCartContext';

interface GalleryType {
	[0]: string;
	[1]: {
		desktop: string;
		mobile?: string;
		tablet?: string;
	};
}

interface InTheBoxType {
	item: string;
	quantity: number;
}
/**
 * ProductPage component
 *
 * This component renders a product page with various details and recommendations.
 */
const ProductPage = () => {
	// Hooks
	const { productName } = useParams();
	const navigate = useNavigate();

	// Filter product data
	const productData = data.filter((data) => data.slug === productName)[0];

	// context
	const { quantity, resetQuantity, updateCart } = UseShoppingCart();

	// Destructure product data
	const {
		features,
		categoryImage,
		new: isNewProduct,
		name,
		description,
		price,
		includes,
		gallery,
		slug,
	} = productData;

	const handleImageError = (e: React.SyntheticEvent) => {
		const target = e.target as HTMLImageElement;
		target.src = errorImg;
	};

	// Split feature description
	const featureDescription = features.split('\n');

	// Get recommended products
	const recommendedProducts = getBestRecommended(productName as string);

	/**
	 * Render recommended product
	 *
	 * This function maps over recommended products and returns a ReactNode.
	 */
	const renderRecommendedProduct = (): ReactNode => {
		const recommendedProduct: ReactNode = recommendedProducts.map((product) => {
			return (
				<div
					className={styles.productRecommendation}
					key={product.id}
				>
					<div>
						<img
							src={product.categoryImage.desktop}
							alt={product.name}
							onError={handleImageError}
						/>
					</div>
					<p className='display-text'>{product.name}</p>
					<RRDLink
						to={`/product/${product.slug}`}
						style={{
							marginTop: 'auto',
						}}
					>
						<Button>See Product</Button>
					</RRDLink>
				</div>
			);
		});

		return recommendedProduct;
	};

	/**
	 * Render gallery showcase
	 *
	 * This function maps over gallery items and returns a ReactNode.
	 */
	const renderShowCaseGallery = (gallery: GalleryType[]): ReactNode => {
		const galleryNodeElement: ReactNode = gallery.map((item, index) => {
			const backgroundImageStyle = {
				backgroundImage: `url(${item[1].desktop}), url(${errorImg})`,
			};

			const isValidImage = item[1].desktop && item[1].desktop.length > 0;

			return (
				<div
					className={styles.showcaseImg}
					style={isValidImage ? backgroundImageStyle : {}}
					key={index}
				>
					{!isValidImage && <div>Failed to load image!</div>}
				</div>
			);
		});

		return galleryNodeElement ?? <div>Failed to gallery!</div>;
	};

	/**
	 * Render feature description
	 *
	 * This function maps over feature description and returns a ReactNode.
	 */
	const renderFeaturesDesc = (featureDescription: Array<string>): ReactNode => {
		const desc = featureDescription.map((desc, index) => {
			if (desc !== '') {
				return <p key={index}>{desc}</p>;
			}
		});

		return desc;
	};

	/**
	 * Render items in the box
	 *
	 * This function maps over items in the box and returns a ReactNode.
	 */
	const renderInTheBoxItems = (includes: InTheBoxType[]): ReactNode => {
		const inTheBoxItemElement = includes.map((item, index) => {
			return (
				<li key={index}>
					<span className={styles.quantity}>{item.quantity}x</span>
					<span className={styles.item}>{item.item}</span>
				</li>
			);
		});

		return inTheBoxItemElement;
	};

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
								onError={handleImageError}
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
								<Button
									onClick={() => {
										updateCart({
											item: slug,
											quantity: quantity,
										});

										resetQuantity();
									}}
								>
									Add to cart
								</Button>
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
								{renderFeaturesDesc(featureDescription)}
							</div>
						</div>

						<div className={styles.inTheBox}>
							<h3 className='text--h3'>In the box</h3>
							<ul>{renderInTheBoxItems(includes)}</ul>
						</div>
					</article>

					<article>
						<div className={styles.showcaseGallery}>
							{renderShowCaseGallery(Object.entries(gallery))}
						</div>
					</article>

					<article className={styles.recommendations}>
						<h3 className='text--h3'>You may also like</h3>
						<div className={styles.recommendedProducts}>
							{renderRecommendedProduct()}
						</div>
					</article>
				</section>

				<section>
					<Products />
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
