// components
import Header from '../components/Header';
import ShowProduct from '../components/ShowProduct';
import Products from '../components/Products';
import Review from '../components/Review';
import Footer from '../components/Footer';

// data
import data from '../data/data.json';

// types
type category = 'speakers';
const Speakers = () => {
	const category: category = 'speakers';

	const speakers = data.filter((item) => item.category === category);
	speakers.reverse();

	return (
		<div>
			<Header>
				<span className='text--h2'>Speakers</span>
			</Header>

			<main>
				<section>
					{speakers.map((speaker, index) => {
						const {
							id,
							categoryImage,
							description,
							new: isNew,
							name,
						} = speaker;
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

export default Speakers;
