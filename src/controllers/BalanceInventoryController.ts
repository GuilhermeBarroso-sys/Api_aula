import { Request, Response } from 'express'
import { BalanceInventoryService } from '../services/BalanceInventoryService'

class BalanceInventoryController {

  async create(request: Request, response: Response) {
    const { product_id, amount } = request.body
    const balanceServices = new BalanceInventoryService()

    try {
      const products = await balanceServices.create({ product_id, amount })
      return response.json(products)
    } catch (err) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }

  async index(request: Request, response: Response) {
    const balanceServices = new BalanceInventoryService();

    try {
      const products = await balanceServices.index()
      return response.status(200).json(products)
    } catch (err: any) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }
}

export { BalanceInventoryController }