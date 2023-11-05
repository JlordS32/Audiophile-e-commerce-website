import { useState, useRef, useEffect } from 'react';
import styles from '../styles/form.module.css';
import { UseShoppingCart } from '../context/ShoppingCartContext';

type PaymentType = 'e-money' | 'cash' | '';

type FormProps = {
	placeholder?: string;
	id?: string;
	label?: string;
	value?: string;
	error?: boolean;
	errorMsg?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
};

type RadioProps = {
	value: string;
	label: string;
	id?: string;
	name?: string;
	error?: boolean;
	selectedValue?: string;
	onClick?: (value: PaymentType, id: string) => void;
};

const Form = {
	// Structed this component this way to make it int	o a reusable component just like with React Bootstrap
	Text: function Text({
		placeholder = '',
		id,
		label,
		error = false,
		errorMsg,
		type,
		onChange,
		value,
	}: FormProps) {
		const inputId = id ? id : `text-${crypto.randomUUID()}`;
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{label && (
					<div
						className='d-flex'
						style={{
							justifyContent: 'space-between',
						}}
					>
						<label
							htmlFor={inputId}
							className={`${styles.label} ${error ? styles.error : ''}`}
						>
							{label}
						</label>
						{error && (
							<label
								htmlFor={inputId}
								className={`${styles.label} ${error ? styles.error : ''}`}
							>
								{errorMsg ?? 'Error'}
							</label>
						)}
					</div>
				)}
				<input
					type={type ? type : 'text'}
					placeholder={placeholder}
					aria-label={`Input: ${placeholder}`}
					name={inputId}
					value={value}
					// second class is for error styles
					className={`${styles.form} ${error ? styles.error : ''}`}
					onChange={onChange}
				/>
			</div>
		);
	},
	Radio: function Radio({
		value = '',
		label = '',
		id,
		name,
		onClick,
		error = false,
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
			<div>
				<div
					className={`${styles.form} ${checked ? styles.checked : ''} ${
						styles.radioContainer
					} ${error ? styles.error : ''}`}
					onClick={() => {
						if (onClick) {
							onClick(
								radioRef.current?.value as PaymentType,
								radioRef.current?.id as string
							);
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
							id='paymentMethod'
							name={name}
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
