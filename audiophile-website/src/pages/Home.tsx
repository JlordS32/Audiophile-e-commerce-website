// rrd imports
import { Link as RRDLink } from 'react-router-dom';

// components
import Button from '../components/Button';
import Products from '../components/Products';
import styles from '../styles/home.module.css';

// image imports
import zx9Img from '../assets/home/desktop/image-speaker-zx9.png';
import Review from '../components/Review';
import Footer from '../components/Footer';

// libraries
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
	AOS.init();

	return (
		<div className={styles.homeContainer}>
			<div className={styles.home}>
				<div
					className={styles.hero}
					data-aos='fade-in'
					data-aos-duration='2000'
				>
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
						<p
							className='text-white'
							style={{
								opacity: '0.75',
							}}
						>
							Experience natural, lifelike audio and exceptional build quality
							made for the passionate music enthusiast.
						</p>
					</div>
					<RRDLink to={`/product/xx99-mark-ii-headphones`}>
						<Button>See Product</Button>
					</RRDLink>
				</div>
			</div>

			{/* Products section */}
			<Products />

			<section className='d-flex justify-content-center align-items-center flex-column'>
				<article
					className={styles.zx9SpeakerSection}
					data-aos='fade-up'
					data-aos-duration='1000'
				>
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
						<RRDLink to={`/product/zx9-speaker`}>
							<Button variant='dark'>See Product</Button>
						</RRDLink>
					</div>
				</article>

				<article
					className={styles.zx7Section}
					data-aos='fade-right'
					data-aos-duration='1000'
				>
					<div className={styles.zx7Desc}>
						<span
							className='text--h4'
							style={{
								fontWeight: '700',
							}}
						>
							Zx7 Speaker
						</span>
						<RRDLink to={`/product/zx7-speaker`}>
							<Button variant='dark-outline'>See Product</Button>
						</RRDLink>
					</div>
				</article>

				<article className={styles.earphonesDesc}>
					<div
						data-aos='fade-right'
						data-aos-duration='1000'
					></div>
					<div
						data-aos='fade-left'
						data-aos-duration='1000'
					>
						<span
							className='text--h4'
							style={{
								fontWeight: '700',
							}}
						>
							YX1 Earphones
						</span>
						<RRDLink to={`/product/yx1-wireless-earphones`}>
							<Button variant='dark-outline'>See Product</Button>
						</RRDLink>
					</div>
				</article>
			</section>

			{/* Review section about Audiophile */}
			<div
				data-aos='fade-right'
				data-aos-duration='1000'
			>
				<Review />
			</div>

			<Footer />
		</div>
	);
};

export default Home;
