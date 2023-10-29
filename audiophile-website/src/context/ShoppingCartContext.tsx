import React, { createContext, useContext, useState } from 'react';

export function UseShoppingCart() {
	return useContext(ShoppingCartContext);
}

type ShoppingCartContext = {
	increaseQuantity: () => void;
	decreaseQuantity: () => void;
	quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [quantity, setQuantity] = useState<number>(0);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity && quantity > 0) {
			setQuantity((prev) => {
				return prev - 1;
			});
		}
	};

	return (
		<ShoppingCartContext.Provider
			value={{ quantity, increaseQuantity, decreaseQuantity }}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
}
