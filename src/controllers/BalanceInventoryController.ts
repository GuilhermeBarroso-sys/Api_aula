import { Request, Response } from 'express'
import { BalanceInventoryService } from '../services/BalanceInventoryService'

class BalanceInventoryController {

  async create(request: Request, response: Response) {
    const { product_id, amount } = request.body
    const balanceServices = new BalanceInventoryService()

    try {
      const balanceInventory = await balanceServices.create({ product_id, amount })
      return response.json(balanceInventory)
    } catch (err) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }
  async index(request: Request, response: Response) {
    const balanceServices = new BalanceInventoryService();
    try {
      const balanceInventory = await balanceServices.index()
      return response.status(200).json(balanceInventory)
    } catch (err: any) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }

  async show(request: Request, response: Response) {
    const {id} = request.params
    const balanceServices = new BalanceInventoryService();
    try {
      const balanceInventory = await balanceServices.show(id);
      return response.status(200).json(balanceInventory)
    } catch (err: any) {
      return response
        .status(400)
        .json({ mensagem: err.message })
    }
  }

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {product_id, amount} = request.body
    const balanceService = new BalanceInventoryService();
    try {
      const balanceInventory = await balanceService.update(id, {product_id,amount});
      return response.status(200).json(balanceInventory)
    } catch(err) {
      return response
      .status(400)
      .json({ mensagem: err.message })
    }
  }
  
  async delete(request: Request, response: Response) {
    //
    const {id} = request.params;
    const balanceService = new BalanceInventoryService();
    try {
      const balanceInventory = await balanceService.delete(id);
      return response.status(200).send()
    } catch(err) {
      return response
      .status(400)
      .json({ mensagem: err.message })
    }
  }
}

export { BalanceInventoryController }