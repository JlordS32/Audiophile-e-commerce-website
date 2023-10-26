import React from 'react';
import styles from '../styles/buttons.module.css';
import '../styles/buttons.module.css'

type ButtonProps = {
	variant: string;
};

const Button = ({ variant }: ButtonProps) => {
	return (
		<div className={`${styles.btn} ${styles[`btn--${variant}`]}`}>See more</div>
	);
};

export default Button;
