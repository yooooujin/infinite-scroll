import React, { useState, useEffect, useCallback, useRef } from 'react'
import Products from './components/Products'
import Layout from './Layout'
import ProductsSkeleton from './components/Products/ProductsSkeleton'
import getProducts from './api/getProducts'

const perPage = 8

function App() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<{
    pages: IProductData[][]
    total: number
  }>({ pages: [], total: 0 })

  const targetRef = useRef<HTMLUListElement>(null)

  const handleFetch = useCallback(async (page: number) => {
    setLoading(true)

    const { data, total } = await getProducts(page, perPage)

    if (total > page * perPage) {
      setProducts((prev) => {
        const pages = prev.pages
        pages[page - 1] = data

        return { pages, total }
      })
    }

    setLoading(false)
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
    handleFetch(page)
  }, [page])

  useEffect(() => {
    const children = targetRef.current?.children

    const observer = new IntersectionObserver(handleScrollPages, {
      threshold: [0, 1],
    })

    if (children && children.length > 0) {
      observer.observe(children[children.length - 1].children[perPage - 1])
    }

    return () => {
      observer.disconnect()
    }
  }, [targetRef.current])

  return (
    <Layout>
      <section ref={targetRef}>
        {products.pages.map((page, index) => (
          <Products key={`products_page_${index}`} data={page} />
        ))}
        {loading && <ProductsSkeleton />}
      </section>
    </Layout>
  )
}

export default App
