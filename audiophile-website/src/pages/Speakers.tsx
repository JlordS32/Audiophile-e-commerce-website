// components
import Header from '../components/Header';
import ShowProduct from '../components/ShowProduct';
import Products from '../components/Products';
import Review from '../components/Review';
import Footer from '../components/Footer';

// images 
import zx9SpeakerImg from '../assets/product-zx9-speaker/desktop/image-product.jpg';
import zx7SpeakerImg from '../assets/product-zx7-speaker/desktop/image-product.jpg';

const Speakers = () => {
	return (
		<div>
			<Header>
				<span className='text--h2'>Speakers</span>
			</Header>

			<main>
				<section>
					<ShowProduct
						imgUrl={zx9SpeakerImg}
						title={'ZX9 Speaker'}
						description={
							'Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.'
						}
						newProduct={true}
					/>
					<ShowProduct
						imgUrl={zx7SpeakerImg}
						title={'ZX7 Speaker'}
						description={
							'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.'
						}
						reverseOrder={true}
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

export default Speakers;
