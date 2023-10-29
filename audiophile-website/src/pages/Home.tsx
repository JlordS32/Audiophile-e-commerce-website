import Button from '../components/Button';
import Products from '../components/Products';
import styles from '../styles/home.module.css';

// image imports
import zx9Img from '../assets/home/desktop/image-speaker-zx9.png';
import Review from '../components/Review';
import Footer from '../components/Footer';

const Home = () => {
	return (
		<div className={styles.homeContainer}>
			<div className={styles.home}>
				<div className={styles.hero}>
					<p
						className='overline text-white'
						style={{
							opacity: '0.5',
						}}
					>
						New Product
					</p>
					<div
						className='product-desc'
						style={{
							marginBottom: '1rem',
						}}
					>
						<h1
							className='text--h1 text-white'
							style={{
								marginBottom: '1.5rem',
							}}
						>
							XX99 Mark II Headphones
						</h1>
						<p className='text-white'>
							Experience natural, lifelike audio and exceptional build quality
							made for the passionate music enthusiast.
						</p>
					</div>
					<Button
						variant='primary'
						onClick={() => alert('sdf')}
					>
						See Product
					</Button>
				</div>
			</div>

			{/* Products section */}
			<Products />

			<section className='d-flex justify-content-center align-items-center flex-column'>
				<article className={styles.zx9SpeakerSection}>
					<div className={styles.imgContainer}>
						<img
							src={zx9Img}
							alt='ZX9-Speaker-Image'
						/>
					</div>
					<div className={styles.zx9SpeakerDesc}>
						<h1 className='text--h1'>Zx9 Speaker</h1>
						<p>
							Upgrade to premium speakers that are phenomenally built to deliver
							truly remarkable sound.
						</p>
						<Button variant='dark'>See Product</Button>
					</div>
				</article>

				<article className={styles.zx7Section}>
					<div className={styles.zx7Desc}>
						<span
							className='text--h4'
							style={{
								fontWeight: '700',
							}}
						>
							Zx7 Speaker
						</span>
						<Button variant='dark-outline'>See Product</Button>
					</div>
				</article>

				<article className={styles.earphonesDesc}>
					<div>
					</div>
					<div>
						<span
							className='text--h4'
							style={{
								fontWeight: '700',
							}}
						>
							YX1 Earphones
						</span>
						<Button variant='dark-outline'>See Product</Button>
					</div>
				</article>
			</section>

         {/* Review section about Audiophile */}
         <Review />

         <Footer />
		</div>
	);
};

export default Home;
