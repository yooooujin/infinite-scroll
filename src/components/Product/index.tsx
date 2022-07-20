import React, { HTMLProps } from 'react'
import './product.css'

type Props = HTMLProps<HTMLLIElement> & Omit<IProductData, 'id'>

function Product({ thumbnailImage, title, price, ...rest }: Props) {
  return (
    <li className="product__wrapper" {...rest}>
      <section className="product__thumbnail">
        <img
          className="product__thumbnail__image"
          src={thumbnailImage}
          alt="product thumbnail"
        />
      </section>
      <section className="product__info">
        <h4 className="product__info__name">{title}</h4>
        <p className="product__info__price">{price.toLocaleString()}원</p>
      </section>
    </li>
  )
}

export default Product
