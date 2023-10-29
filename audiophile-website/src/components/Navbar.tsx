import { useEffect } from 'react';

// rrd imports
import { NavLink, useLocation } from 'react-router-dom';

// styles
import styles from '../styles/nav.module.css';

// images
import companyLogo from '../assets/shared/desktop/logo.svg';
import cartIcon from '../assets/shared/desktop/icon-cart.svg';
import burgerIcon from '../assets/shared/tablet/icon-hamburger.svg';

const Navbar = () => {
	const location = useLocation();

	const pathname: Array<string> = ['/headphones'];

	const pageBlackBg = pathname.find((item) => item === location.pathname);

	return (
		<div
			className={styles.nav}
			style={{
				backgroundColor: pageBlackBg ? 'black' : 'transparent',
			}}
		>
			<div className='d-flex'>
				<div className={styles.burgerMenu}>
					<img
						src={burgerIcon}
						alt='menu icon'
						style={{
							marginRight: '2.7rem',
						}}
					/>
				</div>
				<NavLink to='/'>
					<div className='logo'>
						<img
							src={companyLogo}
							alt='company logo'
						/>
					</div>
				</NavLink>
			</div>

			<div className={styles.navLink}>
				<NavLink to='/'>
					<span>Home</span>
				</NavLink>
				<NavLink to='headphones'>
					<span>Headphones</span>
				</NavLink>
				<NavLink to='speakers'>
					<span>Speakers</span>
				</NavLink>
				<NavLink to='earphones'>
					<span>Earphones</span>
				</NavLink>
			</div>
			<div className='checkout'>
				<img
					src={cartIcon}
					alt='cart icon'
				/>
			</div>
		</div>
	);
};

export default Navbar;
