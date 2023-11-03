import { useState, useRef, useEffect } from 'react';
import styles from '../styles/form.module.css';
import { UseShoppingCart } from '../context/ShoppingCartContext';

type PaymentType = 'e-money' | 'cash' | '';

type FormProps = {
	placeholder?: string;
	id?: string;
	label?: string;
	error?: boolean;
	onChange?: () => void;
	type?: string;
};

type RadioProps = {
	value: string;
	label: string;
	id?: string;
	selectedValue?: string;
	onClick?: (value: PaymentType) => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form = {
	// Structed this component this way to make it into a reusable component just like with React Bootstrap
	Text: function Text({
		placeholder = '',
		id,
		label,
		error,
		onChange,
		type,
	}: FormProps) {
		const inputId = id ? id : `radio-${crypto.randomUUID()}`;
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{label && (
					<label
						htmlFor={inputId}
						className={styles.label}
					>
						{label}
					</label>
				)}
				<input
					type={type ? type : 'text'}
					placeholder={placeholder}
					aria-label={`Input: ${placeholder}`}
					name={inputId}
					// second class is for error styles
					className={`${styles.form} ${error ? styles.error : ''}`}
					onChange={() => {
						// if there's no onChange function passed down then function returns.
						if (!onChange) return;
						onChange();
					}}
				/>
			</div>
		);
	},
	Radio: function Radio({
		value = '',
		label = '',
		id,
		onClick,
		selectedValue = '',
	}: RadioProps) {
		const [checked, setChecked] = useState<boolean>(false);

		// useref
		const radioRef = useRef<HTMLInputElement>(null);

		const inputId = id ? id : `radio-${crypto.randomUUID()}`;

		useEffect(() => {
			setChecked(selectedValue === radioRef.current?.value);
		});

		return (
			<div
				className={`${styles.form} ${checked ? styles.checked : ''} ${
					styles.radioContainer
				}`}
				onClick={() => {
					if (onClick) {
						onClick(radioRef.current?.value as PaymentType);
					}
				}}
			>
				<label
					htmlFor={inputId}
					style={{
						flex: '1',
					}}
					className={`${styles.label} radio-label`}
				>
					<input
						type='radio'
						value={value}
						id={inputId}
						name={inputId}
						className={styles.radio}
						ref={radioRef}
						checked={checked}
						readOnly
					/>
					<span
						style={{
							marginLeft: '1.5rem',
							fontSize: '0.875rem',
						}}
					>
						{label}
					</span>
				</label>
			</div>
		);
	},

	Counter: function Counter() {
		const { quantity, increaseQuantity, decreaseQuantity } = UseShoppingCart();

		return (
			<div>
				<div className={styles.counter}>
					<span
						className={styles.increment}
						onClick={() => decreaseQuantity()}
					>
						-
					</span>
					<span className={styles.value}>{quantity}</span>
					<span
						className={styles.decrement}
						onClick={() => increaseQuantity()}
					>
						+
					</span>
				</div>
			</div>
		);
	},
};

export default Form;
