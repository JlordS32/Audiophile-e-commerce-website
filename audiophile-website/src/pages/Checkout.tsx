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
	name: '';
	email: '';
	phone: '';
	address: '';
	postcode: '';
	city: '';
	country: '';
	paymentMethod: '';
}

const Checkout = () => {
	// default values
	const defaultFormError: FormError = {
		name: {
			error: false,
			errorMsg: "Field can't be empty"
		},
		email: {
			error: false,
			errorMsg: "Field can't be empty"
		},
		phone: {
			error: false,
			errorMsg: "Field can't be empty"
		},
		address: {
			error: false,
			errorMsg: "Field can't be empty"
		},
		postcode: {
			error: false,
			errorMsg: "Field can't be empty"
		},
		city: {
			error: false,
			errorMsg: "Field can't be empty"
		},
		country: {
			error: false,
			errorMsg: "Field can't be empty"
		},
		paymentMethod: {
			error: false,
			errorMsg: "Field can't be empty"
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

	const navigate = useNavigate();

	const handleClick = (value: PaymentType) => {
		setSelectedRadio(value ?? '');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// // Implement your validation logic here
		// if (name === 'email') {
		// 	// Example email validation
		// 	const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
		// 	if (!isValidEmail) {
		// 		setFormErrors({ ...formErrors, email: 'Invalid email address' });
		// 	} else {
		// 		setFormErrors({ ...formErrors, email: '' });
		// 	}
		// }
	};

	const handleSubmit = () => {
		Object.entries(formData).forEach(([key, value]) => {
			if (!value && value === '') {
				console.log(key, value);
				setFormErrors(prev => {
					return {
						...prev,
						[key]: {
						  ...prev[key],
						  error: true
						}
					 };
				  
				});
			}
		});
	};

	useEffect(() => {
		console.log(formErrors);
	}, [formErrors]);

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
										type='email'
										id='email'
										onChange={handleInputChange}
										error={formErrors.email.error}
										errorMsg={formErrors.email.errorMsg}
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
									/>
								</fieldset>
								<fieldset>
									<Form.Text
										label='ZIP Code'
										placeholder='10001'
										id='postcode'
										type='number'
										onChange={handleInputChange}
										error={formErrors.postcode.error}
										errorMsg={formErrors.postcode.errorMsg}
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
									/>
								</fieldset>
								<fieldset>
									<Form.Text
										label='Country'
										placeholder='United States'
										id='country'
										onChange={handleInputChange}
										error={formErrors.country.error}
										errorMsg={formErrors.city.errorMsg}
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
									id='eMoney'
								/>
								<Form.Radio
									value='cash'
									label='Cash on Delivery'
									onClick={handleClick}
									selectedValue={selectedRadio}
									id='cashOnDelivery'
								/>
							</fieldset>

							{selectedRadio === 'e-money' && (
								<div className={`${styles.grid} ${styles.eMoney}`}>
									<Form.Text
										placeholder='238521993'
										label='e-Money Number'
										type='number'
										onChange={handleInputChange}
									/>
									<Form.Text
										placeholder='6891'
										label='e-Money PIN'
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
						</section>
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
							onClick={handleSubmit}
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
