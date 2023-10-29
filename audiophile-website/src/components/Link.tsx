import { ReactNode } from 'react';
import styles from '../styles/buttons.module.css';

type LinkProps = {
	children?: ReactNode;
};

const Link = ({ children }: LinkProps) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<span className={`${styles['btn--link']}`}>{children}</span>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='7'
				height='12'
				viewBox='0 0 7 12'
				fill='none'
				style={{
					marginLeft: '0.85rem',
				}}
			>
				<path
					d='M1.32178 1L6.32178 6L1.32178 11'
					stroke='#D87D4A'
					strokeWidth='2'
				/>
			</svg>
		</div>
	);
};

export default Link;
