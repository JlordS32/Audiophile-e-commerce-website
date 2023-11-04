import React, { useEffect, useRef, useState } from 'react';

// rrd imports
import { useNavigate, Form as RRDForm } from 'react-router-dom';

// styles
import styles from '../styles/checkout.module.css';

// image imports
import cashOnDelivery from '../assets/checkout/icon-cash-on-delivery.svg';

// components
import Footer from '../components/Footer';
import Form from '../components/Form';
import Button from '../components/Button';
import OrderConfirmation from '../components/OrderConfirmation';

// utitilities
import {
	cleanUpString,
	createFormSessionStorage,
	fetchData,
	fetchSessionData,
	formatCurrency,
	validateData,
} from '../utility/utilities';

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

interface ErrorTypes {
	error: boolean;
	errorMsg: string;
}

interface FormError {
	name: ErrorTypes;
	email: ErrorTypes;
	phone: ErrorTypes;
	address: ErrorTypes;
	postcode: ErrorTypes;
	city: ErrorTypes;
	country: ErrorTypes;
	paymentMethod: ErrorTypes;
	[key: string]: ErrorTypes;
}

interface FormData {
	name: string | '';
	email: string | '';
	phone: string | '';
	address: string | '';
	postcode: string | '';
	city: string | '';
	country: string | '';
	paymentMethod: PaymentType;
}

const Checkout = () => {
	const SHIPPING_PRICE = 50;
	const VAT_RATE = 1.2;

	// default values
	const defaultFormError: FormError = {
		name: {
			error: false,
			errorMsg: "Field can't be empty",
		},
		email: {
			error: false,
			errorMsg: "Field can't be empty",
		},
		phone: {
			error: false,
			errorMsg: "Field can't be empty",
		},
		address: {
			error: false,
			errorMsg: "Field can't be empty",
		},
		postcode: {
			error: false,
			errorMsg: "Field can't be empty",
		},
		city: {
			error: false,
			errorMsg: "Field can't be empty",
		},
		country: {
			error: false,
			errorMsg: "Field can't be empty",
		},
		paymentMethod: {
			error: false,
			errorMsg: "Field can't be empty",
		},
	};

	const defaultFormData: FormData = {
		name: '',
		email: '',
		phone: '',
		address: '',
		postcode: '',
		city: '',
		country: '',
		paymentMethod: '',
	};

	// states
	const [selectedRadio, setSelectedRadio] = useState<PaymentType>('');
	const [formData, setFormData] = useState<FormData>(defaultFormData);
	const [formErrors, setFormErrors] = useState<FormError>(defaultFormError);

	const orders = fetchData('cart') ?? [];

	const orderData = orders
		.map((order: OrderType) => {
			const matchingItem = data.find((item) => item.id === order.id);
			if (matchingItem) {
				return {
					...matchingItem,
					quantity: order.quantity,
				};
			}
			return null; // Handle the case where no matching item is found
		})
		.filter((order: OrderType) => order !== null);

	// ref
	const dialogRef = useRef<HTMLDialogElement>(null);

	const total: number = orderData.reduce((prev, next) => {
		return prev + next.price * next.quantity;
	}, 0);

	const wordsToRemove = [
		'Headphones',
		'Wireless,',
		'Speaker',
		'Earphones',
		'wireless',
	];

	// custom context
	const { total: totalQuantity } = UseShoppingCart();

	// rrd hooks
	const navigate = useNavigate();

	const handleClick = (value: PaymentType, id: string) => {
		setSelectedRadio(value ?? '');

		setFormData({ ...formData, [id]: value });
		createFormSessionStorage({ ...formData, [id]: value });
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		createFormSessionStorage({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		Object.entries(formData).forEach(([key, value]) => {
			const { valid, errorMsg } = validateData(key, value);

			setFormErrors((prev) => {
				return {
					...prev,
					[key]: {
						...prev[key],
						error: !valid,
						errorMsg: errorMsg,
					},
				};
			});
		});
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent the default form submission behavior

		const isValid = Object.values(formErrors).every((value) => !value.error);

		console.log(formErrors);
		console.log(isValid);

		if (isValid) {
			dialogRef.current?.showModal();
		} else {
			// If the form is not valid, you can display an error message or take other actions.
			console.log('Form is not valid. Please correct the errors.');
		}
	};

	useEffect(() => {
		const sessionFormData = fetchSessionData('form') ?? defaultFormData;

		setFormData(sessionFormData);
	}, []);

	return (
		<div className={styles.checkoutContainer}>
			<div className={styles.checkout}>
				<div
					onClick={() => navigate(-1)}
					className={styles.goBack}
				>
					<a>Go back</a>
				</div>

				<RRDForm onSubmit={handleFormSubmit}>
					<div className={styles.checkoutForm}>
						<h3 className='text--h3'>Checkout</h3>
						<section className={styles.billingDetails}>
							<p>Billing Details</p>
							<div className={styles.grid}>
								<fieldset
									style={{
										gridArea: 'auto',
									}}
								>
									<Form.Text
										placeholder='Alexei Wart'
										label='Name'
										id='name'
										onChange={handleInputChange}
										error={formErrors.name.error}
										errorMsg={formErrors.name.errorMsg}
										value={formData.name}
									/>
								</fieldset>
								<fieldset
									style={{
										gridArea: 'auto',
									}}
								>
									<Form.Text
										placeholder='alexei@mail.com'
										label='Email Address'
										type='text'
										id='email'
										onChange={handleInputChange}
										error={formErrors.email.error}
										errorMsg={formErrors.email.errorMsg}
										value={formData.email}
									/>
								</fieldset>
								<fieldset
									style={{
										gridArea: 'auto',
									}}
								>
									<Form.Text
										placeholder='+1 202-555-0136'
										label='Phone Number'
										id='phone'
										type='phone'
										onChange={handleInputChange}
										error={formErrors.phone.error}
										errorMsg={formErrors.phone.errorMsg}
										value={formData.phone}
									/>
								</fieldset>
							</div>
						</section>

						<section className={styles.shippingInfo}>
							<p>Shipping info</p>

							<div className={styles.grid}>
								<fieldset className={styles.address}>
									<Form.Text
										label='Address'
										placeholder='1137 Williams Avenue'
										type='text'
										id='address'
										onChange={handleInputChange}
										error={formErrors.address.error}
										errorMsg={formErrors.address.errorMsg}
										value={formData.address}
									/>
								</fieldset>
								<fieldset>
									<Form.Text
										label='Postcode'
										placeholder='10001'
										id='postcode'
										type='text'
										onChange={handleInputChange}
										error={formErrors.postcode.error}
										errorMsg={formErrors.postcode.errorMsg}
										value={formData.postcode}
									/>
								</fieldset>
								<fieldset>
									<Form.Text
										label='City'
										placeholder='New York'
										id='city'
										onChange={handleInputChange}
										error={formErrors.city.error}
										errorMsg={formErrors.city.errorMsg}
										value={formData.city}
									/>
								</fieldset>
								<fieldset>
									<Form.Text
										label='Country'
										placeholder='United States'
										id='country'
										onChange={handleInputChange}
										error={formErrors.country.error}
										errorMsg={formErrors.country.errorMsg}
										value={formData.country}
									/>
								</fieldset>
							</div>
						</section>

						<section className={styles.paymentDetails}>
							<p>Payment details</p>
							<fieldset className={styles.grid}>
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
									name='eMoney'
								/>
								<Form.Radio
									value='cash'
									label='Cash on Delivery'
									onClick={handleClick}
									selectedValue={selectedRadio}
									name='cashOnDelivery'
								/>
							</fieldset>

							{selectedRadio === 'e-money' && (
								<div className={`${styles.grid} ${styles.eMoney}`}>
									<Form.Text
										placeholder='238521993'
										label='e-Money Number'
										id='paymentMethod'
										type='number'
										onChange={handleInputChange}
									/>
									<Form.Text
										placeholder='6891'
										label='e-Money PIN'
										id='paymentMethod'
										type='number'
										onChange={handleInputChange}
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
										<img
											src={cashOnDelivery}
											alt='cash on delivery'
										/>
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
						</section>
					</div>
					<div className={styles.summary}>
						<h4>Summary</h4>
						<div className={styles.ordersContainer}>
							{orderData.map((order: any) => {

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
										<div className={styles.quantity}>x{order.quantity}</div>
									</div>
								);
							})}
						</div>
						<div className={styles.summaryFields}>
							<p className={styles.fields}>Total</p> {formatCurrency(total)}
						</div>
						<div className={styles.summaryFields}>
							<p className={styles.fields}>Shipping</p>{' '}
							{formatCurrency(SHIPPING_PRICE)}
						</div>
						<div className={styles.summaryFields}>
							<p className={styles.fields}>VAT {`(included)`}:</p>{' '}
							{formatCurrency(total * VAT_RATE - total)}
						</div>

						<div className={`${styles.summaryFields} ${styles.grandTotal}`}>
							<p className={styles.fields}>Grand total</p>
							<p>{formatCurrency(total * VAT_RATE + SHIPPING_PRICE)}</p>
						</div>

						<Button
							width='100%'
							type='submit'
							onClick={handleSubmit}
						>
							Continue & Pay
						</Button>
					</div>
				</RRDForm>
			</div>
			<Footer />

			<OrderConfirmation
				dialogRef={dialogRef}
				grandTotal={total * VAT_RATE + SHIPPING_PRICE}
				orderData={orderData[0]}
				totalQuantity={totalQuantity}
			/>
		</div>
	);
};

export default Checkout;
