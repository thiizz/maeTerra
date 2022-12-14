import Link from 'next/link';
import { VscChromeClose } from 'react-icons/vsc';
import Items from '../Items';
import style from './SearchModal.module.css'
import HeaderSearchModal from './HeaderSearchModal';

export default function SearchModal({ data, searching, setItems, setSearch, scrollDirection, find }) {
	const quantity = data?.data?.map(product => product)
	const handleClose = () => {
		setSearch(false)
		setItems([])
	}
	if (searching) {
		return (
			<div className={`${style.container} ${scrollDirection !== 'down' ? style.containerNormal : style.containerSmall}`}>
				<div className={style.header}>
					<span className={style.resultTitle}>Procurando produtos...</span>
					<button onClick={() => handleClose()} className={style.close}><VscChromeClose /></button>
				</div>
			</div>
		)
	}
	return (
		<div className={`${style.container} ${scrollDirection !== 'down' ? style.containerNormal : style.containerSmall}`}>

			<HeaderSearchModal quantity={quantity} handleClose={handleClose} />

			{
				data.length !== 0 &&
				<>
					{quantity?.length === 0 && <div className={style.center}>
						<div className={style.notFound}>Produto não encontrado.</div>
					</div>
					}
					{data.data?.map((item, index) => {
						if (index < 5) {
							return (
								<Items key={item.id} item={item} />
							)
						}
					})}
					{quantity?.length > 2 &&
						<div className={style.center}>
							<Link href={`/busca/?term=${find}`}><a className={style.viewMore}>Ver todos resultados.</a></Link>
						</div>
					}
				</>
			}
		</div >
	)


}