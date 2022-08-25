import Image from 'next/image'
import Banner from "../components/home/banner/Banner";
import Infos from '../components/home/infos/Infos'
import Products from '../components/home/products/Products'
import style from '../styles/Products.module.css'
import Filters from '../components/home/filters/Filters'


export default function Home({ data }) {
  return (
    <main className="page">
      <Banner />
      <Infos />
      <div className={`${style.content}`} id='produtos'>
        <Filters />
        <section className={style.container}>
          {data.map((item) => {
            return (
              <section key={item.id} className={style.productContainer}>
                <div>
                  <div className={style.imageContainer}>
                    <Image className={style.product} src={item.image} alt='Produto' width='650' height='500px' />
                  </div>
                  <a href='#'>{item.title}</a>
                  <p>R$ {item.price}</p>
                  <button className={style.buy} type='button'>comprar</button>
                </div>
              </section>
            );
          })}
        </section>
      </div>
    </main>
  )
}
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/product-list');
  const data = await res.json();
  return {
    props: {
      data: data,
    },
    revalidate: 30,
  };
}