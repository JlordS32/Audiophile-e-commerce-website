// react imports
import { useRef, useEffect } from 'react';

// styles
import styles from '../styles/nav.module.css';

// utilities
import { cleanUpString, fetchData, formatCurrency } from '../utility/utilities';

// components
import Button from './Button';

// data
import data from '../data/data.json';
import { UseShoppingCart } from '../context/ShoppingCartContext';

// types
type CartModal = {
	close: () => void;
};

type OrderType = {
	id: number;
	quantity: number;
	item: string;
};

const CartModal = ({ close }: CartModal) => {
	const orderedItems: OrderType[] = fetchData('cart') ?? [];
	const modalRef = useRef<HTMLDivElement>(null);

	const { removeCart } = UseShoppingCart();

	// useEffect to make sure that the modal is focused on reload.
	useEffect(() => {
		modalRef.current?.focus();
	}, []);

	const orderData = data.filter((item) =>
		orderedItems.some((order: OrderType) => order.id === item.id)
	);

	const wordToRemove = ['Headphones', 'Wireless', 'Speaker', 'Earphones'];

	const total = orderData.reduce((prev, next) => {
		const orderQuantity = orderedItems.find((item) => {
			if (item.id === next.id) return item.quantity;
		})?.quantity;

		return prev + next.price * orderQuantity;
	}, 0);

	return (
		<div className={styles.overlay}>
			<div
				className={styles.modal}
				onBlur={close}
				tabIndex={0}
				ref={modalRef}
			>
				<div className={styles.cartHeader}>
					<h5 className='text--h5'>Cart</h5>
					{orderedItems && orderedItems.length > 0 && (
						<div
							className='standard-text'
							onClick={removeCart}
						>
							Remove All
						</div>
					)}
				</div>

				<div>
					{orderedItems && orderedItems.length > 0 ? (
						<div>
							{orderData.map((order, index) => {
								return (
									<div
										key={index}
										className={styles.order}
									>
										<div className='orderImg'>
											<img
												src={order.image.desktop}
												alt={`Order: ${order.name}`}
												style={{
													width: '4rem',
													height: '4rem',
												}}
											/>
										</div>
										<div className='details'>
											<div
												className='product'
												aria-label={order.name}
											>
												{cleanUpString(order.name, wordToRemove)}
											</div>
											<div className='price'>
												<div aria-label={order.price.toString()}>
													{formatCurrency(order.price)}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<h4
							className='display-text'
							style={{
								padding: '2rem 0',
							}}
						>
							Your cart is empty!
						</h4>
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
						{formatCurrency(total)}
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
