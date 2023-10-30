import { ReactNode } from 'react';

import { XMarkIcon } from '@heroicons/react/20/solid';
import styles from '../styles/offcanvas.module.css';

type OffCanvasProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	children?: ReactNode;
};

const OffCanvas = ({ open, setOpen, children }: OffCanvasProps) => {
	return (
		<div
			className={styles.offCanvasContainer}
			style={{
				display: open ? 'flex' : 'none',
			}}
		>
			<div
				className={styles.closeBtn}
				onClick={() => setOpen(false)}
			>
				<XMarkIcon width={35} />
			</div>

			<div onClick={() => setOpen(false)}>{children}</div>
		</div>
	);
};

export default OffCanvas;
