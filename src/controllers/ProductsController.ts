import { Request, Response } from 'express'

import { ProductsServices } from '../services/ProductsService'

class ProductsController {

  async create(request: Request, response: Response) {
    const { product, unitMeasurement } = request.body

    const productsServices = new ProductsServices()

    try {
      const products = await productsServices.create({ product, unitMeasurement })
      return response.json(products)
    } catch (err) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }

  async index(request: Request, response: Response) {
    const productsServices = new ProductsServices();

    try {
      const products = await productsServices.index()
      return response.status(200).json(products)
    } catch (err: any) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }
}

export { ProductsController }