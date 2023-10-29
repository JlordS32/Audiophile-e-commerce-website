// images
import yx1Image from '../assets/product-yx1-earphones/desktop/image-product.jpg';

// components
import ShowProduct from '../components/ShowProduct';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Products from '../components/Products';
import Review from '../components/Review';
const Earphones = () => {
	return (
		<div>
			<Header>
				<span className='text--h2'>Earphones</span>
			</Header>

			<main>
				<section>
					<ShowProduct
						imgUrl={yx1Image}
						description={
							'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.'
						}
						title={'YX1 Wireless Earphones'}
						newProduct={true}
					/>
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

export default Earphones;
