import React, { useEffect, useState } from 'react';

// rrd imports
import { useNavigate, Form as RRDForm } from 'react-router-dom';

// styles
import styles from '../styles/checkout.module.css';

// components
import Footer from '../components/Footer';
import Form from '../components/Form';
import Button from '../components/Button';
import { cleanUpString, fetchData, formatCurrency } from '../utility/utilities';

// data
import data from '../data/data.json';
import { UseShoppingCart } from '../context/ShoppingCartContext';

// types
type PaymentType = 'e-money' | 'cash' | '';

type OrderType = {
	id: number;
	quantity: number;
	item: string;
};

const Checkout = () => {
	const [selectedRadio, setSelectedRadio] = useState<PaymentType>('');

	const orders = fetchData('cart') ?? [];

	const orderData = data.filter((item) =>
		orders.some((order: OrderType) => order.id === item.id)
	);

	const total = orderData.reduce((prev, next) => {
		const orderQuantity = orders.find((item: OrderType) => {
			if (item.id === next.id) return item.quantity;
		})?.quantity;

		if (orderQuantity) {
			return prev + next.price * orderQuantity;
		} else {
			return prev + next.price;
		}
	}, 0);

	const wordsToRemove = [
		'Headphones',
		'Wireless,',
		'Speaker',
		'Earphones',
		'wireless',
	];

	console.log(orderData);

	const navigate = useNavigate();

	const handleClick = (value: PaymentType) => {
		setSelectedRadio(value ?? '');
	};

	return (
		<div className={styles.checkoutContainer}>
			<div className={styles.checkout}>
				<div
					onClick={() => navigate(-1)}
					className={styles.goBack}
				>
					<a>Go back</a>
				</div>

				<RRDForm>
					<div className={styles.checkoutForm}>
						<h3 className='text--h3'>Checkout</h3>
						<div className={styles.billingDetails}>
							<p>Billing Details</p>
							<div className={styles.grid}>
								<div
									style={{
										gridArea: 'auto',
									}}
								>
									<Form.Text
										placeholder='Alexei Wart'
										label='Name'
									/>
								</div>
								<div
									style={{
										gridArea: 'auto',
									}}
								>
									<Form.Text
										placeholder='alexei@mail.com'
										label='Email Address'
									/>
								</div>
								<div
									style={{
										gridArea: 'auto',
									}}
								>
									<Form.Text
										placeholder='+1 202-555-0136'
										label='Phone Number'
									/>
								</div>
							</div>
						</div>

						<div className={styles.shippingInfo}>
							<p>Shipping info</p>

							<div className={styles.grid}>
								<div className={styles.address}>
									<Form.Text
										label='Address'
										placeholder='1137 Williams Avenue'
									/>
								</div>
								<div>
									<Form.Text
										label='ZIP Code'
										placeholder='10001'
									/>
								</div>
								<div>
									<Form.Text
										label='City'
										placeholder='New York'
									/>
								</div>
								<div>
									<Form.Text
										label='Country'
										placeholder='United States'
									/>
								</div>
							</div>
						</div>

						<div className={styles.paymentDetails}>
							<p>Payment details</p>
							<div className={styles.grid}>
								<label
									style={{
										gridRow: 'span 2',
									}}
								>
									Payment Method
								</label>
								<Form.Radio
									value='e-money'
									label='e-Money'
									onClick={handleClick}
									selectedValue={selectedRadio}
								/>
								<Form.Radio
									value='cash'
									label='Cash on Delivery'
									onClick={handleClick}
									selectedValue={selectedRadio}
								/>
							</div>

							{selectedRadio === 'e-money' && (
								<div
									className={`${styles.grid} ${styles.eMoney}`}
								>
									<Form.Text
										placeholder='238521993'
										label='e-Money Number'
										type='number'
									/>
									<Form.Text
										placeholder='6891'
										label='e-Money PIN'
										type='number'
									/>
								</div>
							)}
							{selectedRadio === 'cash' && (
								<div
									className='d-flex justify-content-center align-items-center'
									style={{
										gap: '0 1rem',
										paddingTop: '3rem',
									}}
								>
									<div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='48'
											height='48'
										>
											<path
												fill='#D87D4A'
												d='M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.694 3.674a1.15 1.15 0 1 1-1.848-1.37c2.568-3.53 2.864-3.545 2.864-4.285 0-.779-.636-1.406-1.407-1.406h-5.404a17.658 17.658 0 0 1 9.606-2.813h4.33a1.406 1.406 0 0 0 0-2.812h-4.33c-5.277 0-10.33 2.02-14.142 5.625h-8.34c-.777 0-1.407.63-1.407 1.406v9.938h-8.53c-.777 0-1.406.63-1.406 1.406v15.6a14.053 14.053 0 0 0-7.824 3.089 1.406 1.406 0 1 0 1.772 2.185 11.226 11.226 0 0 1 7.048-2.499h3.129a1.407 1.407 0 0 1 0 2.813H8.436a1.406 1.406 0 0 0 0 2.812h13.728a4.226 4.226 0 0 1-3.977 2.813H1.405a1.406 1.406 0 0 0 0 2.812h16.782c3.395 0 6.236-2.42 6.89-5.625h7.36c.776 0 1.406-.63 1.406-1.406V25.312h9.843c.777 0 1.407-.63 1.407-1.406V11.25h1.5a1.406 1.406 0 0 0 0-2.813ZM33.61 17.599a1.404 1.404 0 0 0-1.172-.63h-3.085c-1.084-1.834.241-4.172 2.381-4.172 2.531 0 3.708 3.115 1.876 4.802ZM21.188 8.437h14.06c-.744 1.03-1.057 1.305-1.352 1.983-4.216-1.779-8.726 2.057-7.559 6.549h-5.15V8.437ZM19.78 19.782h2.813v5.625H19.78v-5.625Zm11.25 19.782H16.54c.969-2.735-1.07-5.626-3.979-5.626H11.25V19.782h5.719v7.032c0 .776.63 1.406 1.406 1.406H24c.777 0 1.406-.63 1.406-1.407v-7.03h5.625v19.78ZM33.844 22.5v-1.771a5.56 5.56 0 0 0 3.453-4.769 3.954 3.954 0 0 0 3.424-1.611l1.56-2.127V22.5h-8.437Z'
											></path>
										</svg>
									</div>
									<div
										className='standard-text'
										style={{
											opacity: '0.5',
										}}
									>
										The ‘Cash on Delivery’ option enables you to pay in cash
										when our delivery courier arrives at your residence. Just
										make sure your address is correct so that your order will
										not be cancelled.
									</div>
								</div>
							)}
						</div>
					</div>
					<div className={styles.summary}>
						<h4>Summary</h4>
						<div className={styles.ordersContainer}>
							{orderData.map((order) => {
								const orderQuantity = orders.find((item: OrderType) => {
									if (item.id === order.id) return item.quantity;
								})?.quantity;

								return (
									<div
										key={order.id}
										className={styles.order}
									>
										<img
											src={order.image.desktop}
											alt={order.name}
											style={{
												width: '4rem',
												borderRadius: '0.5rem',
											}}
										/>
										<div className={styles.orderDetails}>
											<p>{cleanUpString(order.name, wordsToRemove)}</p>
											<p>{formatCurrency(order.price)}</p>
										</div>
										<div className={styles.quantity}>x{orderQuantity}</div>
									</div>
								);
							})}
						</div>
						<div className={styles.summaryFields}>
							<p className={styles.fields}>Total</p> {formatCurrency(total)}
						</div>
						<div className={styles.summaryFields}>
							<p className={styles.fields}>Shipping</p> {formatCurrency(50)}
						</div>
						<div className={styles.summaryFields}>
							<p className={styles.fields}>VAT {`(included)`}:</p>{' '}
							{formatCurrency(total * 1.2 - total)}
						</div>

						<div className={`${styles.summaryFields} ${styles.grandTotal}`}>
							<p className={styles.fields}>Grand total</p>
							<p>{formatCurrency(total * 1.2 + 50)}</p>
						</div>

						<Button
							width='100%'
							type='submit'
						>
							Continue & Pay
						</Button>
					</div>
				</RRDForm>
			</div>
			<Footer />
		</div>
	);
};

export default Checkout;
