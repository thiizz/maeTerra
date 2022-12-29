import style from './index.module.css'
import { GrClose } from 'react-icons/gr'
import { MdKeyboardBackspace } from 'react-icons/md'
import Login from './Login'
import Register from './Register'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useToggleLoginModal } from '../../contexts/LoginModalContext'
import { useBackgroundVariant } from '../../lib/useBackgroundVariant'
import { useAuth } from '../../contexts/AuthContext'
import ForgotPass from './forgot-pass/ForgotPass'
import InputCode from './forgot-pass/InputCode'
import ChangePass from './forgot-pass/ChangePass'
import Loader from '../recover-account-loader/Loader'

export default function ModalLogin() {
	const { pathname, push } = useRouter()
	const { toggleLoginModal, setToggleLoginModal } = useToggleLoginModal()
	const [switchModal, setSwitchModal] = useState("login")
	const [recoverData, setRecoverData] = useState({ email: '', code: '' })
	const [loading, setLoading] = useState(false)
	const backgroundVariant = useBackgroundVariant()
	const { auth } = useAuth()

	const loginVariant = {
		open: { opacity: 1, x: 0 },
		closed: { opacity: 0, x: "-400%" },
	}
	const container = () => {
		if (switchModal === "login") return style.containerLogin
		if (switchModal === "register") return style.containerRegister
		if (switchModal === "ForgotPass") return style.containerForgotPass
		if (switchModal === "verifyRecoverCode") return style.containerVerifyRecoverCode
		if (switchModal === "changePass") return style.changePass

		return ''
	}


	const content = () => {
		if (switchModal === "login") return <Login setSwitchModal={setSwitchModal} setLoading={setLoading} setToggleLoginModal={setToggleLoginModal} />
		if (switchModal === "register") return <Register setSwitchModal={setSwitchModal} setLoading={setLoading} />

		if (switchModal === "ForgotPass") return (
			<>
				<button style={{ transform: `translate(0, -7px)` }} onClick={() => setSwitchModal("login")} className={`${style.returnLogin} ${style.topBtn} `}><MdKeyboardBackspace /></button>
				<ForgotPass setSwitchModal={setSwitchModal} setLoading={setLoading} setRecoverData={setRecoverData} />
			</>
		)
		if (switchModal === "verifyRecoverCode") return (
			<>
				<div className={style.loginTitle}><span>ESQUECEU A SUA SENHA?</span></div>
				<button style={{ transform: `translate(0, -7px)` }} onClick={() => setSwitchModal("ForgotPass")} className={`${style.returnLogin} ${style.topBtn} `}><MdKeyboardBackspace /></button>
				<div style={{ textAlign: "center", width: "19rem", margin: "auto auto .625rem auto" }}>
					<span style={{ fontSize: ".9rem", fontFamily: "Roboto, Arial, sans-serif", color: "#8d8d8d" }}>Digite o código de 6 dígitos que enviamos por e-mail para continuar.</span>
				</div>
				<InputCode setSwitchModal={setSwitchModal} setLoading={setLoading} recoverData={recoverData} setRecoverData={setRecoverData} />
			</>
		)
		if (switchModal === "changePass") return (
			<ChangePass setSwitchModal={setSwitchModal} setLoading={setLoading} recoverData={recoverData} />
		)

	}

	return (
		<>
			{Object.keys(auth).length === 0 &&
				<motion.div animate={toggleLoginModal ? "open" : "closed"} variants={loginVariant} style={toggleLoginModal ? { zIndex: 16 } : ''} className={style.container} transition={{ ease: "easeOut", duration: 0.25 }}>
					<motion.div className={style.background} animate={toggleLoginModal ? "visible" : "hidden"} variants={backgroundVariant} transition={{ ease: "easeOut", duration: 0.3 }}>

						{pathname !== "/pagamento" && <div onClick={() => setToggleLoginModal(false)} className={style.focusOut}></div>}

						<div className={`${style.containerMenu} ${container()}`}>

							{pathname === "/pagamento" ? <button onClick={() => push('/') && setToggleLoginModal(false)} className={`${style.returnLogin} ${style.topBtn} `}><MdKeyboardBackspace /></button>
								:
								<button onClick={() => setToggleLoginModal(false)} className={`${style.closeLogin} ${style.topBtn} `}><GrClose /></button>
							}
							{!loading ?
								content()
								:
								<Loader />
							}
						</div >
					</motion.div>
				</motion.div >}
		</>
	)
}