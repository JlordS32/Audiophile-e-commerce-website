// components
import Header from '../components/Header';
import ShowProduct from '../components/ShowProduct';
import Products from '../components/Products';
import Review from '../components/Review';
import Footer from '../components/Footer';

// images
import xx99Img from '../assets/product-xx99-mark-two-headphones/desktop/image-product.jpg';
import xx99MarkI from '../assets/product-xx99-mark-one-headphones/desktop/image-product.jpg';
import xx59Img from '../assets/product-xx59-headphones/desktop/image-product.jpg';

const Headphones = () => {
	return (
		<div>
			<Header>
				<span className='text--h2'>Headphones</span>
			</Header>

			<main>
				<section>
					<ShowProduct
						imgUrl={xx99Img}
						description={
							'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
						}
						title={'XX99 Mark II Headphones'}
						newProduct={true}
					/>
					<ShowProduct
						imgUrl={xx99MarkI}
						description={
							'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.'
						}
						title={'XX99 Mark I Headphones'}
						reverseOrder={true}
					/>
					<ShowProduct
						imgUrl={xx59Img}
						description={
							'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.'
						}
						title={'XX59 Headphones'}
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

export default Headphones;
