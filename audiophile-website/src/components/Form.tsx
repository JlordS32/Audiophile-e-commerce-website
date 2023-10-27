import { useState } from 'react';
import styles from '../styles/form.module.css';
import { UseShoppingCart } from '../context/ShoppingCartContext';

type FormProps = {
	placeholder?: string;
	id?: string;
	label?: string;
	error?: boolean;
	onChange?: () => void;
};

type RadioProps = {
	value: string;
	label: string;
	id?: string;
};


const Form = {
	// Structed this component this way to make it into a reusable component just like with React Bootstrap
	Text: function Text({
		placeholder = '',
		id,
		label,
		error,
		onChange,
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
					type='text'
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
	Radio: function Radio({ value = '', label = '', id }: RadioProps) {
		const [checked, setChecked] = useState<boolean>(false);

		const inputId = id ? id : `radio-${crypto.randomUUID()}`;

		return (
			<div
				className={`${styles.form} ${checked ? styles.checked : ''}`}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
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
						onClick={() => setChecked(!checked)}
						checked={checked}
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
					<span className={styles.increment} onClick={() => decreaseQuantity()}>-</span>
					<span className={styles.value}>{quantity}</span>
					<span className={styles.decrement} onClick={() => increaseQuantity()}>+</span>
				</div>
			</div>
		);
	},
};

export default Form;
