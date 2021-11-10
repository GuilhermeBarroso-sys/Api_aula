import { getCustomRepository, Repository } from "typeorm";
import { BalanceInventory } from "../entities/BalanceInventory";
import { BalanceInventoryRepository } from "../repositories/BalanceInventory";

interface ICreateBalanceInventoryService {
  product_id: string;
  amount : number;
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
      const amountCount :  Array<{amount: string}>  = await repository
      .createQueryBuilder("balanceInventory")
      .select("SUM(balanceInventory.amount)", "amount")
      .where("balanceInventory.product_id = :product_id", { product_id })
      .getRawMany()
      await repository.update(checkIfExists.id, {
        amount: parseInt(amountCount[0].amount) + amount
      } )
      return amountCount
    }
  
    const balanceInventory = repository.create({
       product_id,
       amount
    })
    console.log(balanceInventory, product_id, amount)
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
}
export {BalanceInventoryService}