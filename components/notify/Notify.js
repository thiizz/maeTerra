import style from './Notify.module.css'

export function NotifySuccess({ msg }) {
	return (
		<div className={style.notify_cart_container}>
			<h5 className={style.msg}>{msg}</h5>
		</div>
	)
}

export function NotifyInfo({ msg }) {
	return (
		<div className={style.notify_cart_container}>
			<h5 className={style.msg}>{msg}</h5>
		</div>
	)
}

export function NotifyError({ msg }) {
	return (
		<div className={style.notify_cart_container}>
			<h5 className={style.msg}>{msg}</h5>
		</div>
	)
}

export function NotifyLoading() {
	return (
		<div className={style.notify_cart_container}>
			<h5 className={style.msg}>Verificando acesso...</h5>
		</div>
	)
}

export function NotifyCart({ msg }) {
	return (
		<div className={style.notify_cart_container}>
			<h5 className={style.msg}>{msg}</h5>
		</div>
	)
}

export function NotifyInfoCart({ msg }) {
	return (
		<div className={style.notify_cart_container}>
			<h5 className={style.msg}>{msg}</h5>
		</div>
	)
}