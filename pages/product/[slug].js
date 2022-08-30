import { request } from "../../lib/datocms"

const SLUGPAGE_QUERY = `query SlugPage($limit: IntType) {
	allProducts(first: $limit) {
		  title
		  price
		  image {
			responsiveImage(imgixParams: {fit: crop}){         
				src
				width
				height   
				base64
			  }
			}
		  slug
		}
  }`;

function productPage({ product }) {
	return (
		<div>
			<h1>{product.title}.</h1>
			<p>{product.price}</p>
		</div>
	)
}

export async function getStaticProps({ params }) {
	const slug = params?.slug
	const products = await fetch(process.env.PRODUCTS_API)
	const data = await products.json()
	const product = data.find((p) => p.slug === slug) || null
	if (!product) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			product,
		},
	}
}

export async function getStaticPaths() {
	const data = await fetch(process.env.PRODUCTS_API)
	const products = await data.json()
	const slugs = products.map((p) => ({ params: { slug: p.slug } }))
	return {
		paths: slugs,
		fallback: true,
	}
}


export default productPage