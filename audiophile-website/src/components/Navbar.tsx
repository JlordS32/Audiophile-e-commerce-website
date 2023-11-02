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
import { UseShoppingCart } from '../context/ShoppingCartContext';
import CartModal from './CartModal';

const Navbar = () => {
	const [openOffCanvas, setOpenOffCanvas] = useState<boolean>(false);
	const [cartModal, setCartModal] = useState<boolean>(false);

	const { total } = UseShoppingCart();

	const location = useLocation();

	const productPathPattern = /^\/product\/[a-zA-Z0-9-]+$/;

	const pageBlackBg = productPathPattern.test(location.pathname);

	const closeCartModal = () => {
		setCartModal(false);
	};

	return (
		<>
			<div
				className={styles.nav}
				style={{
					backgroundColor: pageBlackBg ? 'black' : 'transparent',
				}}
			>
				<div
					className={styles.burgerMenu}
					onClick={() => setOpenOffCanvas(true)}
				>
					<img
						src={burgerIcon}
						alt='menu icon'
					/>
				</div>
				<NavLink to='/'>
					<div className={styles.logo}>
						<img
							src={companyLogo}
							alt='company logo'
						/>
					</div>
				</NavLink>

				<div className={styles.navLink}>
					<NavLink
						to='/'
						onClick={closeCartModal}
					>
						<span>Home</span>
					</NavLink>
					<NavLink
						to='headphones'
						onClick={closeCartModal}
					>
						<span>Headphones</span>
					</NavLink>
					<NavLink
						to='speakers'
						onClick={closeCartModal}
					>
						<span>Speakers</span>
					</NavLink>
					<NavLink
						to='earphones'
						onClick={closeCartModal}
					>
						<span>Earphones</span>
					</NavLink>
				</div>
				<div
					className={styles.checkout}
					onClick={() => setCartModal(!cartModal)}
				>
					<img
						src={cartIcon}
						alt='cart icon'
					/>

					{total > 0 && <div className={styles.quantityTotal}>{total}</div>}
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

			{/* Opens modal when cart is clicked */}
			{cartModal && <CartModal close={() => setCartModal(false)}/>}
		</>
	);
};

export default Navbar;
