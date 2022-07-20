import React, { useState, useEffect, useCallback } from 'react'
import Products from './components/Products'
import Layout from './Layout'
import productsData from './constants/products'

const perPage = 8

function App() {
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<{
    pages: IProductData[][]
    total: number
  }>({ pages: [], total: 0 })

  const getProducts = useCallback(function (page: number): IProductsData {
    return {
      data: productsData.data.slice((page - 1) * perPage, perPage),
      total: productsData.total,
    }
  }, [])

  useEffect(() => {
    const { data, total } = getProducts(page)

    setProducts((prev) => {
      const pages = prev.pages
      pages[page - 1] = data

      return { pages, total }
    })
  }, [page])

  return (
    <Layout>
      {products.pages.map((page, index) => (
        <Products key={`products_page_${index}`} data={page} />
      ))}
    </Layout>
  )
}

export default App
