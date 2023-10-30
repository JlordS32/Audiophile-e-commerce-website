// components
import Header from '../components/Header';
import ShowProduct from '../components/ShowProduct';
import Products from '../components/Products';
import Review from '../components/Review';
import Footer from '../components/Footer';

// data
import data from '../data/data.json';

type category = 'headphones';
const Headphones = () => {

	const category: category = 'headphones';

	const headphones = data.filter((item) => item.category === category);
	headphones.reverse();

	return (
		<div>
			<Header>
				<span className='text--h2'>Headphones</span>
			</Header>

			<main>
				<section>
					{headphones.map((headphone, index) => {
						const { id, categoryImage, description, new: isNew, name } = headphone;
						if (index % 2 === 0) {
							return (
								<ShowProduct
									imgUrl={categoryImage.desktop}
									description={description}
									title={name}
									reverseOrder={true}
									newProduct={isNew ?? false}
									key={id}
								/>
							);
						} else {
							return (
								<ShowProduct
									imgUrl={categoryImage.desktop}
									description={description}
									title={name}
									newProduct={isNew ?? false}
									key={id}
								/>
							);
						}
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

export default Headphones;
