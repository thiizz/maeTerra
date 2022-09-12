import { useContext } from "react";
import { createContext} from "react";
import { Flip, toast } from 'react-toastify'
import NotifyCart from "../components/notify/NotifyCart";
import { useMenuCart } from "..//contexts/OpenCartMenuContext";
import 'react-toastify/dist/ReactToastify.css';



const NotifyContext = createContext()

export default function NotifyProvider({ children }) {
	const { setIsOpen } = useMenuCart()

	const notifyCart = () => toast.success(<NotifyCart/>, {
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
		transition: Flip,
		theme: "colored",
		onClick: () => setIsOpen(true),
	});
	const state = {
		notifyCart
	}

	return (
		<NotifyContext.Provider value={state}>
			{children}
		</NotifyContext.Provider>
	)
}

export function useNotify() {
	const context = useContext(NotifyContext)
	const {
		notifyCart
	} = context
	return {
		notifyCart
	}
}