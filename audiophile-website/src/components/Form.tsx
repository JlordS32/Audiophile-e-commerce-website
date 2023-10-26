import styles from '../styles/form.module.css';

type FormProps = {
	placeholder?: string;
	error?: boolean;
};

type RadioProps = {
	value: string;
};

const Form = {
	Control: function Control({ placeholder = '', error }: FormProps) {
		return (
			<input
				type='text'
				placeholder={placeholder}
				className={`${styles.form} ${error ? styles.error : ''}`}
			/>
		);
	},
	Radio: function Radio({ value = '' }: RadioProps) {
		return (
			<div className={styles.form}>
				<input
					type='radio'
					value='testsdflkjsdf'
					id='test'
					name='test'
				/>
				<label htmlFor='test'>asdfasdf</label>
			</div>
		);
	},
};

export default Form;
