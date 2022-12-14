import client from './apolloclient'
import { gql } from "@apollo/client";

export async function SearchProducts({ search }) {
	const { data } = await client.query({
		query: gql`query SearchProducts{
		  allProducts(first: 100, filter: {title: {matches: {pattern: "${search}"}}}) {
			  id
			  title
			  price
			  oldPrice
			  image {
				responsiveImage(imgixParams: {fm: webp}) {
					src
					base64
				  }
			  url
			  smartTags
			  tags
			}
			  slug
			}
			}`
	})
	return { data: data?.allProducts }
}
