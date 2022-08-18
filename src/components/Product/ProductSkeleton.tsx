import React from 'react'
import './product.css'

function ProductSkeleton() {
  return (
    <li className="skeleton product__wrapper">
      <section className="product__thumbnail">
        <aside className="product__thumbnail__image" />
      </section>
      <section className="product__info">
        <h4 className="product__info__name"></h4>
        <p className="product__info__price"></p>
      </section>
    </li>
  )
}

export default ProductSkeleton
