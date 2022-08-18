import React from 'react'
import ProductSkeleton from '../Product/ProductSkeleton'
import './products.css'

function ProductsSkeleton() {
  return (
    <ul className="products__wrapper">
      {Array.from({ length: 20 }).map((product, index) => (
        <ProductSkeleton key={`product_loading_${index}`} />
      ))}
    </ul>
  )
}

export default ProductsSkeleton
