import { ReactNode } from 'react';
import styles from '../styles/buttons.module.css';
import '../styles/buttons.module.css';

type ButtonProps = {
	variant?: string;
	children?: ReactNode;
	onClick?: () => void;
	width?: string;
	type?: 'button' | 'submit' | 'reset';
};

const Button = ({
	variant = 'primary',
	children,
	onClick,
	width,
	type,
}: ButtonProps) => {
	return (
		<button
			className={`${styles.btn} ${styles[`btn--${variant}`]}`}
			onClick={() => {
				if (!onClick) return;
				onClick();
			}}
			style={{
				width: width ? width : '',
			}}
			type={type ? type : 'button'}
		>
			{children}
		</button>
	);
};

export default Button;
