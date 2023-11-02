// rrd import
import { Link } from 'react-router-dom';

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

// libraries
import { useAutoAnimate } from '@formkit/auto-animate/react';

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
	const [parent] = useAutoAnimate<HTMLDivElement>();

	const {
		removeCart,
		updateCart,
		deleteItemFromCart,
		total: totalQuantity,
	} = UseShoppingCart();

	const orderData = data.filter((item) =>
		orderedItems.some((order: OrderType) => order.id === item.id)
	);

	const wordToRemove = ['Headphones', 'Wireless', 'Speaker', 'Earphones'];

	const total = orderData.reduce((prev, next) => {
		const orderQuantity = orderedItems.find((item) => {
			if (item.id === next.id) return item.quantity;
		})?.quantity;

		if (orderQuantity) {
			return prev + next.price * orderQuantity;
		} else {
			return prev + next.price;
		}
	}, 0);

	// useEffect to make sure that the modal is focused on reload.
	useEffect(() => {
		modalRef.current?.focus();
	}, []);

	return (
		<div className={styles.overlay}>
			<div
				className={styles.modal}
				onBlur={(event) => {
					// Check if the related target is the "Check out" button or one of its descendants
					if (!event.currentTarget.contains(event.relatedTarget)) {
						close();
					}
				}}
				tabIndex={0}
				ref={modalRef}
			>
				<div className={styles.cartHeader}>
					<h5 className='uppercase'>
						{totalQuantity > 0 ? `Cart (${totalQuantity})` : 'Cart'}
					</h5>
					{orderedItems && orderedItems.length > 0 && (
						<div
							className='standard-text'
							onClick={removeCart}
						>
							Remove All
						</div>
					)}
				</div>

				<div
					className={styles.ordersContainer}
					ref={parent}
				>
					{orderedItems && orderedItems.length > 0 ? (
						<>
							{orderData.map((order, index) => {
								const orderQuantity = orderedItems.find((item) => {
									if (item.id === order.id) return item.quantity;
								})?.quantity;

								return (
									<div
										key={index}
										className={styles.order}
									>
										<div className={styles.orderImg}>
											<img
												src={order.image.desktop}
												alt={`Order: ${order.name}`}
												style={{
													width: '4rem',
													height: '4rem',
												}}
											/>
										</div>
										<div className={styles.details}>
											<div
												className={styles.product}
												aria-label={order.name}
											>
												{cleanUpString(order.name, wordToRemove)}
											</div>
											<div className={styles.price}>
												<div aria-label={order.price.toString()}>
													{formatCurrency(order.price)}
												</div>
											</div>
										</div>
										<div className={styles.orderQuantity}>
											<div
												className={styles.adjustQuantityBtn}
												onClick={() => {
													if (orderQuantity && orderQuantity < 99) {
														updateCart({
															item: order.slug,
															quantity: 1,
															id: order.id,
														});
													}
												}}
											>
												+
											</div>
											<div>{orderQuantity}</div>
											<div
												className={styles.adjustQuantityBtn}
												onClick={() => {
													if (orderQuantity && orderQuantity < 99) {
														if (orderQuantity === 1) {
															deleteItemFromCart({
																item: order.slug,
																id: order.id,
															});
															return;
														}

														updateCart({
															item: order.slug,
															quantity: -1,
															id: order.id,
														});
													}
												}}
											>
												-
											</div>
										</div>
									</div>
								);
							})}
						</>
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

				{orderedItems && orderedItems.length > 0 && (
					<>
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
							<Link
								to='/checkout'
								onClick={close}
							>
								<Button width='100%'>Check out</Button>
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CartModal;
