import { useState } from 'react';

// rrd imports
import { NavLink, useLocation } from 'react-router-dom';

// styles
import styles from '../styles/nav.module.css';

// images
import companyLogo from '../assets/shared/desktop/logo.svg';
import cartIcon from '../assets/shared/desktop/icon-cart.svg';
import burgerIcon from '../assets/shared/tablet/icon-hamburger.svg';

// components
import OffCanvas from './OffCanvas';

const Navbar = () => {
	const [openOffCanvas, setOpenOffCanvas] = useState<boolean>(false);

	const location = useLocation();

	const productPathPattern = /^\/product\/[a-zA-Z0-9-]+$/;

	const pageBlackBg = productPathPattern.test(location.pathname);

	return (
		<>
			<div
				className={styles.nav}
				style={{
					backgroundColor: pageBlackBg ? 'black' : 'transparent',
				}}
			>
				<div className='d-flex'>
					<div
						className={styles.burgerMenu}
						onClick={() => setOpenOffCanvas(true)}
					>
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
			<OffCanvas
				open={openOffCanvas}
				setOpen={setOpenOffCanvas}
			>
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
			</OffCanvas>
		</>
	);
};

export default Navbar;
