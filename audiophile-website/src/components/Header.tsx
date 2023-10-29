import { ReactNode } from 'react';
import styles from '../styles/header.module.css';

type HeaderProps = {
	children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
	return (
		<header className={styles.header}>
			<h1>{children}</h1>
		</header>
	);
};

export default Header;
