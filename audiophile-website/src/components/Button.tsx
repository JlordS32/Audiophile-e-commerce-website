import { ReactNode } from 'react';
import styles from '../styles/buttons.module.css';
import '../styles/buttons.module.css';

type ButtonProps = {
	variant?: string;
	children?: ReactNode;
	onClick?: () => void;
	width?: string;
};

const Button = ({ variant = 'primary', children, onClick, width }: ButtonProps) => {
	return (
		<div
			className={`${styles.btn} ${styles[`btn--${variant}`]}`}
			onClick={() => {
				if (!onClick) return;
				onClick();
			}}
			style={{
				width: width ? width : '',
			}}
		>
			{children}
		</div>
	);
};

export default Button;
