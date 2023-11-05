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
import { cleanUpString, formatCurrency } from '../utility/utilities';
import { UseShoppingCart } from '../context/ShoppingCartContext';

function OrderConfirmation({
	dialogRef,
	grandTotal,
	orderData,
	totalQuantity,
}: OrderConfirmationTypes) {
	const { removeCart } = UseShoppingCart();

	return (
		<dialog
			ref={dialogRef}
			className={styles.confirmOrderDialog}
		>
			<div className={styles.imgContainer}>
				<img
					src={checkIcon}
					alt='check icon'
				/>
			</div>
			<h3 className='text--h3'>Thank you for your order</h3>
			<p className='standard-text'>
				You will receive an email confirmation shortly.
			</p>

			<div className={styles.orderDetails}>
				<div className={styles.orderItem}>
					<div
						className={styles.shownOrder}
						style={{
							borderBottom:
								totalQuantity > 1 ? '1px rgba(0, 0, 0, 0.1) solid' : '',
							paddingBottom: totalQuantity > 1 ? '0.75rem' : '',
						}}
					>
						<img
							src={orderData.image.desktop}
							alt={orderData.name}
							style={{
								width: '3.15rem',
							}}
						/>
						<div className={styles.orderDesc}>
							<p>
								{cleanUpString(orderData.name, [
									'Headphones',
									'Wireless',
									'Speaker',
									'Earphones',
								])}
							</p>
							<p>{formatCurrency(orderData.price)}</p>
						</div>
						<div className={styles.price}>x{orderData.quantity}</div>
					</div>
					{totalQuantity > 1 && (
						<div className={styles.restOfTheItems}>
							<p>and {`${totalQuantity - 1} other item(s)`}</p>
						</div>
					)}
				</div>
				<div className={styles.grandTotal}>
					<p>Grand Total</p>
					<p>{formatCurrency(grandTotal)}</p>
				</div>
			</div>

			<RRDLink to='/'>
				<Button
					width='100%'
					onClick={() => {
						removeCart();
					}}
				>
					Back to Home
				</Button>
			</RRDLink>
		</dialog>
	);
}

export default OrderConfirmation;
