import productsData from '../constants/products'

function getProducts(page: number, perPage: number): Promise<IProductsData> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: productsData.data.slice((page - 1) * perPage, page * perPage),
        total: productsData.total,
      })
    }, 1000)
  )
}

export default getProducts
