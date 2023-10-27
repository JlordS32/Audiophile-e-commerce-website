import { ReactNode } from 'react';
import styles from '../styles/buttons.module.css';
import '../styles/buttons.module.css';

type ButtonProps = {
	variant: string;
	children?: ReactNode;
	onClick?: () => void;
};

const Button = ({ variant, children, onClick }: ButtonProps) => {
	return (
		<div
			className={`${styles.btn} ${styles[`btn--${variant}`]}`}
			onClick={() => {
            if (!onClick) return;
            onClick();
         }}
		>
			{children}
		</div>
	);
};

export default Button;
