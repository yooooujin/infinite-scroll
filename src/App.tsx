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
      if (entry.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1)
      }
    },
    [loading]
  )

  useEffect(() => {
    handleFetch(page)
  }, [page])

  useEffect(() => {
    const lastChild = targetRef.current?.lastElementChild

    const observer = new IntersectionObserver(handleScrollPages, {
      threshold: 1,
    })

    if (lastChild?.lastElementChild) {
      observer.observe(lastChild.lastElementChild)
    }

    return () => {
      observer.disconnect()
    }
  }, [targetRef.current?.lastElementChild])

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
