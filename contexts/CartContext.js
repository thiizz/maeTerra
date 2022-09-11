import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";
import { useMenuCart } from "./OpenCartMenuContext";

const CartContext = createContext()

export default function CartProvider({ children }) {
	const [cart, setCart] = useState([])
	const [totalPrice, setTotalPrice] = useState()
	const { isOpen, setIsOpen } = useMenuCart()


	useEffect(() => {
		let value = 0;
		cart.map((item) => {
			value = value + item.price
		})
		setTotalPrice(value)
	}, [cart])

	function add(item) {
		if (!isOpen) {
			setIsOpen(true)
		}
		const newCart = cart;
		newCart.push(item)

		setCart([...newCart])
	}
	const store = {
		add,
		cart,
		totalPrice
	}

	return (
		<CartContext.Provider value={store}>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	const {
		cart,
		add,
		totalPrice
	} = context
	return {
		cart,
		add,
		totalPrice
	}
}