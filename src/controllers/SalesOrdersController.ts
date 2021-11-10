import { Request, Response } from 'express'
import { SalesOrdersService } from '../services/SalesOrdersService'

class SalesOrdersController {

  async create(request: Request, response: Response) {
    let { client_id, product_id, amount, saleDate } = request.body
    const salesOrdersService = new SalesOrdersService()
    saleDate = new Date(saleDate)

    try {
      const salesOrders = await salesOrdersService.create({
        client_id, product_id, amount, saleDate
      })
      return response
        .status(200)
        .json(salesOrders)
    } catch (err: any) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async index(request: Request, response: Response) {
    const salesOrdersService = new SalesOrdersService();

    try {
      const salesOrders = await salesOrdersService.index()
      return response.status(200).json(salesOrders)
    } catch (err: any) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }

  async show(request: Request, response: Response) {
    const salesOrdersService = new SalesOrdersService();
    const { id } = request.params;

    try {
      const salesOrders = await salesOrdersService.show({ id })
      return response.status(200).json(salesOrders)
    } catch (err: any) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }
}

export { SalesOrdersController }