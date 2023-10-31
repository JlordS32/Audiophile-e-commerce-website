import React, { createContext, useContext, useState, useEffect } from 'react';

// utilities
import { createCart, fetchData } from '../utility/utilities';

export function UseShoppingCart() {
	return useContext(ShoppingCartContext);
}

interface CartType {
	item: string;
	quantity: number;
}

type ShoppingCartContext = {
	increaseQuantity: () => void;
	decreaseQuantity: () => void;
	resetQuantity: () => void;
	updateCart: ({ item, quantity }: CartType) => void;
	quantity: number;
	total: number;
	cart: CartType[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function ShoppingCartProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [quantity, setQuantity] = useState<number>(1);
	const [cart, setCart] = useState<CartType[]>([]);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const resetQuantity = () => {
		setQuantity(1);
	};

	const decreaseQuantity = () => {
		if (quantity && quantity > 0) {
			setQuantity((prev) => {
				return prev - 1;
			});
		}
	};

	const total = cart.reduce((prev, next) => {
		return prev + next.quantity;
	}, 0)

	const updateCart = ({ item, quantity }: CartType) => {
		setCart((prev) => {
			const existingItem = prev.find((cartItem) => cartItem.item === item);
			if (existingItem) {
				const updatedCart = prev.map((cartItem) => {
					if (cartItem.item === item) {
						return {
							...cartItem,
							quantity: cartItem.quantity + quantity,
						};
					}
					return cartItem;
				});

				createCart(updatedCart);
				return updatedCart;
			}

			createCart([...prev, { item, quantity }]);
			return [...prev, { item, quantity }];
		});
	};

	useEffect(() => {
		const data = fetchData('cart') ?? [];

		if (data) {
			setCart(data);
		}
	}, []);

	return (
		<ShoppingCartContext.Provider
			value={{
				quantity,
				increaseQuantity,
				updateCart,
				decreaseQuantity,
				cart,
				resetQuantity,
				total
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
}