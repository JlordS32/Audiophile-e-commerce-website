import styles from '../styles/review.module.css';
import bestGear from '../assets/shared/desktop/image-best-gear.jpg';

const Review = () => {
	return (
		<section className={styles.reviewContainer}>
			<div className={styles.review}>
				<div className={styles.bestGearDesc}>
					<div className='text--h2 font-weight-700'>
						Bringing you the <span className='standout'>best</span> audio gear
					</div>
					<p>
						Located at the heart of New York City, Audiophile is the premier
						store for high end headphones, earphones, speakers, and audio
						accessories. We have a large showroom and luxury demonstration rooms
						available for you to browse and experience a wide range of our
						products. Stop by our store to meet some of the fantastic people who
						make Audiophile the best place to buy your portable audio equipment.
					</p>
				</div>

				<div className={styles.imgContainer}>
					<img
						src={bestGear}
						alt='asdf'
					/>
				</div>
			</div>
		</section>
	);
};

export default Review;
