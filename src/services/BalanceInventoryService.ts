import { getCustomRepository, Repository } from "typeorm";
import { BalanceInventory } from "../entities/BalanceInventory";
import { BalanceInventoryRepository } from "../repositories/BalanceInventory";

interface ICreateBalanceInventoryService {
  product_id: string;
  amount : number;
}
interface IUpdateBalanceInventoryService {
  product_id: string
  amount: number
}
class BalanceInventoryService {
  
  async create({product_id,amount}:ICreateBalanceInventoryService) {
    const repository = getCustomRepository(BalanceInventoryRepository);
    const checkIfExists = await repository.findOne({
      where: {
        product_id
      }
    });
    if(checkIfExists) {
        await repository.update(checkIfExists.id, {
        amount: checkIfExists.amount + amount
        })
        const balanceInventoryUpdated = await repository.findOne({
          select: ['id','product_id','amount'],
          where: {
            product_id
          }
        })
        return balanceInventoryUpdated;
    }
    const balanceInventory = repository.create({
       product_id,
       amount
    })
    await repository.save(balanceInventory);
    return balanceInventory;
  }
  async index() {
    const repository = getCustomRepository(BalanceInventoryRepository);
    const balanceInventories = await repository.find({
      relations: ['product']
    });
    return balanceInventories; 

  }
  async show(id: string) {
    const repository = getCustomRepository(BalanceInventoryRepository);
    const balanceInventories = await repository.findOne({
      relations: ['product'],
      where: {
        id
      }
    });
    return balanceInventories; 
  }
  async delete(id : string) {
    const repository = getCustomRepository(BalanceInventoryRepository);
    const fileDestroyed = await repository.delete(id);
    if(fileDestroyed.affected == 0 ) {
      throw new Error("Saldo em estoque nao encontrado!")
    }
    return fileDestroyed;
  }
  async update(id: string, {product_id,amount} : IUpdateBalanceInventoryService) {
    const repository = getCustomRepository(BalanceInventoryRepository);
    await repository.update(id, {
      product_id,
      amount
    });
    const fileUpdated = await repository.findOne({where:{id}, select: ['id', 'product_id', 'amount']});
    return fileUpdated;
  }
}
export {BalanceInventoryService}