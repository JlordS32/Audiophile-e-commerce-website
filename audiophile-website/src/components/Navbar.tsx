// rrd imports
import { NavLink } from 'react-router-dom';

import styles from '../styles/nav.module.css';
import companyLogo from '../assets/shared/desktop/logo.svg';
import cartIcon from '../assets/shared/desktop/icon-cart.svg';

const Navbar = () => {
	return (
		<div className={styles.nav}>
			<NavLink to='/'>
				<div className='logo'>
					<img
						src={companyLogo}
						alt='company logo'
					/>
				</div>
			</NavLink>

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
