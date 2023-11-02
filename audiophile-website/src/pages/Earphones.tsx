// components
import ShowProduct from '../components/ShowProduct';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Products from '../components/Products';
import Review from '../components/Review';

// data import
import data from '../data/data.json';

// types
type category = 'earphones';
const Earphones = () => {
	const category: category = 'earphones';

	const earphones = data.filter((item) => item.category === category);
	earphones.reverse();

	return (
		<div>
			<Header>
				<span className='text--h2'>Earphones</span>
			</Header>

			<main>
				<section>
					{earphones.map((earphone, index) => {
						const {
							id,
							categoryImage,
							description,
							new: isNew,
							name,
							slug
						} = earphone;

						return (
							<ShowProduct
								imgUrl={categoryImage.desktop}
								description={description}
								title={name}
								reverseOrder={index % 2 === 0}
								newProduct={isNew}
								key={id}
								slug={slug}
							/>
						);
					})}
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
