import data from '../data/data.json';

// types

interface CartType {
	item: string;
	quantity: number;
}

export function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(amount);
}

export function cleanUpString(
	word: string,
	wordsToRemove: Array<string>
): string {
	let cleanWorld = word.toLowerCase().trim();

	for (const wordToRemove of wordsToRemove) {
		if (cleanWorld.split(' ').includes('mark')) {
			cleanWorld = cleanWorld.replace('mark', 'mk').trim();
		}

		cleanWorld = cleanWorld.replace(wordToRemove.toLowerCase(), '').trim();
	}

	return cleanWorld as string;
}
export function getBestRecommended(selectedProduct: string) {
	const newData = data.filter((item) => item.slug !== selectedProduct);

	// Shuffle the filteredData array
	const shuffledData = newData.sort(() => 0.5 - Math.random());

	// Get the first 3 elements from the shuffledData array
	const randomData = shuffledData.slice(0, 3);

	return randomData;
}

export function createCart(cart: CartType[]): void {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function fetchData(key: string) {
	return JSON.parse(localStorage.getItem(key) as string);
}

export function deleteCart() {
	localStorage.removeItem('cart');
}

export function validateData(key: string, data: string) {
	switch (key) {
		case 'name':
			const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
			return {
				valid: nameRegex.test(data),
				errorMsg: 'Invalid name',
			};
		case 'email':
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return {
				valid: emailRegex.test(data),
				errorMsg: 'Invalid email address',
			};
		case 'phone':
			const phoneRegex =
				/^(?:\+?\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;
			return {
				valid: phoneRegex.test(data),
				errorMsg: 'Invalid phone number',
			};
		case 'postcode':
			const postcodeRegex = /^[A-Z]{1,2}\d{1,2} ?\d[A-Z]{2}$/i;
			return {
				valid: postcodeRegex.test(data),
				errorMsg: 'Invalid postCode number',
			};
		default:
			const dataNotEmpty = data !== '';
			return {
				valid: dataNotEmpty,
				errorMsg: "Field can't be empty",
			};
	}
}
