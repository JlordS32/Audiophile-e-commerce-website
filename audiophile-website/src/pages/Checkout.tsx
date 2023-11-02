import React from 'react';

// rrd imports
import { useNavigate, Form as RRDForm } from 'react-router-dom';

// styles
import styles from '../styles/checkout.module.css';

// components
import Footer from '../components/Footer';
import Form from '../components/Form';
import Button from '../components/Button';

const Checkout = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.checkoutContainer}>
			<div className={styles.checkout}>
				<div onClick={() => navigate(-1)}>
					<a>Go back</a>
				</div>

				<RRDForm>
					<div
						style={{
							backgroundColor: 'var(--white)',
							width: '47rem',
							height: '70rem',
							padding: '3.35rem 3rem',
							borderRadius: '0.5rem',
						}}
					>
						<h3 className='text--h3'>Checkout</h3>
						<div className='billingDetails'>
							<p
								style={{
									color: 'var(--primary)',
									fontWeight: '700',
									fontSize: '0.8125rem',
									textTransform: 'uppercase',
									paddingTop: '2.5rem',
								}}
							>
								Billing Details
							</p>
							<div
								className='grid'
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',

									gap: '1.5rem 1rem',
								}}
							>
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

						<div className='shippingInfo'>
							<p
								style={{
									color: 'var(--primary)',
									fontWeight: '700',
									fontSize: '0.8125rem',
									textTransform: 'uppercase',
									paddingTop: '2.5rem',
								}}
							>
								Shipping info
							</p>

							<div
								className='grid'
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',
									gap: '1.5rem 1rem',
								}}
							>
								<div style={{
                           gridColumn: 'span 2'
                        }}>
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

                  <div className="paymentDetails">
                     
                  </div>
					</div>
					<div></div>
				</RRDForm>
			</div>
			<Footer />
		</div>
	);
};

export default Checkout;
