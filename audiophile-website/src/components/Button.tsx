import React, { ReactNode } from 'react';
import styles from '../styles/buttons.module.css';
import '../styles/buttons.module.css'

type ButtonProps = {
	variant: string;
   children?: ReactNode
};

const Button = ({ variant, children }: ButtonProps) => {
	return (
		<div className={`${styles.btn} ${styles[`btn--${variant}`]}`}>{children}</div>
	);
};

export default Button;
