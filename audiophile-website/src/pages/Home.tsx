import Button from '../components/Button';
import Products from '../components/Products';
import styles from '../styles/home.module.css';
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
			<section className='products-section' style={{
            padding: '12.5rem 0'
         }}>
				<Products />
			</section>
		</div>
	);
};

export default Home;
