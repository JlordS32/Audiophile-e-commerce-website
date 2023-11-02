import styles from '../styles/nav.module.css';
import { fetchData } from '../utility/utilities';
import Button from './Button';
const CartModal = () => {
	const orderedItems = fetchData('cart') ?? [];

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div
					className='d-flex'
					style={{
						justifyContent: 'space-between',
					}}
				>
					<h5 className='text--h5'>Cart</h5>
					<div>Remove All</div>
				</div>

				<div>
					{orderedItems ? (
						<div>
							{orderedItems.map((order, index) => {
								return <div key={index}>{order.item}</div>;
							})}
						</div>
					) : (
						<div>Your cart is empty.</div>
					)}
				</div>

				<div className={styles.totalSection}>
					<p className='standard-text uppercase'>Total</p>
					<p
						className='display-text'
						style={{
							fontSize: '1.125rem',
						}}
					>
						$125.00
					</p>
				</div>

				<div>
					<Button width='100%'>Check out</Button>
				</div>
			</div>
		</div>
	);
};

export default CartModal;
