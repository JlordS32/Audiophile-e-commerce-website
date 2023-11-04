// react imports
import { LegacyRef } from 'react';

// rrd imports
import { Link as RRDLink } from 'react-router-dom';

// styles
import styles from '../styles/confirmOrderDialog.module.css';

// types
type OrderConfirmationTypes = {
	dialogRef: LegacyRef<HTMLDialogElement>;
	grandTotal: number;
	orderData: any;
	totalQuantity: number;
};

// img imports
import checkIcon from '../assets/checkout/icon-order-confirmation.svg';

// components
import Button from './Button';
import { formatCurrency } from '../utility/utilities';

function OrderConfirmation({
	dialogRef,
	grandTotal,
	orderData,
	totalQuantity,
}: OrderConfirmationTypes) {
	console.log(orderData.quantity);

	return (
		<dialog
			ref={dialogRef}
			className={styles.confirmOrderDialog}
		>
			<img
				src={checkIcon}
				alt='check icon'
				style={{
					marginBottom: '2rem',
				}}
			/>
			<h3 className='text--h3'>Thank you for your order</h3>
			<p
				className='standard-text'
				style={{
					paddingBottom: '2rem',
					paddingTop: '1.5rem',
				}}
			>
				You will receive an email confirmation shorlty
			</p>

			<div className='d-flex'>
				<div>
					<div className='d-flex'>
						<img
							src={orderData.image.desktop}
							alt={orderData.name}
							style={{
								width: '3.15rem',
							}}
						/>
						<div>
							<p>{orderData.name}</p>
							<p>{formatCurrency(orderData.price)}</p>
						</div>
						<div>{orderData.quantity}</div>
					</div>
					<div>
						<p>and {`${totalQuantity - 1} other item(s)`}</p>
					</div>
				</div>
				<div className='grandTotal'>
					<p>Grand Total</p>
					<p>{formatCurrency(grandTotal)}</p>
				</div>
			</div>

			<RRDLink to='/'>
				<Button width='100%'>Back to Home</Button>
			</RRDLink>
		</dialog>
	);
}

export default OrderConfirmation;
