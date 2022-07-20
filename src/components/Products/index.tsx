import React, { HTMLProps } from 'react'
import Product from '../Product'
import './products.css'

type Props = Omit<HTMLProps<HTMLUListElement>, 'data'> & {
  data?: IProductData[]
}

function Products({ data, ...rest }: Props) {
  return (
    <ul className="products__wrapper" {...rest}>
      {data?.map((product) => (
        <Product key={`product_${product.id}`} {...product} />
      ))}
    </ul>
  )
}

export default Products
