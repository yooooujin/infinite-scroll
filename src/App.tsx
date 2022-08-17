import React, { useState, useEffect, useCallback, useRef } from 'react'
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

  const targetRef = useRef<HTMLDivElement>(null)

  const getProducts = useCallback(function (page: number): IProductsData {
    return {
      data: productsData.data.slice((page - 1) * perPage, page * perPage),
      total: productsData.total,
    }
  }, [])

  const handleScrollPages = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1)
      }
    },
    []
  )

  useEffect(() => {
    const { data, total } = getProducts(page)

    if (total <= page * perPage) return

    setProducts((prev) => {
      const pages = prev.pages
      pages[page - 1] = data

      return { pages, total }
    })
  }, [page])

  useEffect(() => {
    if (!targetRef.current) return

    const observer = new IntersectionObserver(handleScrollPages, {
      threshold: 1,
    })

    observer.observe(targetRef.current)

    return () => {
      observer.disconnect()
    }
  }, [targetRef])

  return (
    <Layout>
      {products.pages.map((page, index) => (
        <Products key={`products_page_${index}`} data={page} />
      ))}

      <section ref={targetRef}>{/* TODO Loading */}</section>
    </Layout>
  )
}

export default App
