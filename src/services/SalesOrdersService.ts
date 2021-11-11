import { getCustomRepository } from 'typeorm'
import { BalanceInventoryRepository } from '../repositories/BalanceInventory'
import { ClientsRepository } from '../repositories/ClientsRepository'
import { ProductsRepository } from '../repositories/ProductsRepository'
import { SalesOrdersRepository } from '../repositories/SalesOrdersRepository'

interface ISalesOrdersServiceCreate {
  client_id: string;
  product_id: string;
  amount: number;
  saleDate: Date
}

interface ISalesOrdersServicesShow {
  id: string;
}
interface ISalesOrdersServiceUpdate {
  client_id: string;
  product_id: string;
  amount: number;
  saleDate: Date
}

class SalesOrdersService {

  async create({ client_id, product_id, amount, saleDate }: ISalesOrdersServiceCreate) {
    const salesOrdersServiceRepository = getCustomRepository(SalesOrdersRepository)
    const clientsRepository = getCustomRepository(ClientsRepository)
    const productsRepository = getCustomRepository(ProductsRepository)
    const clientsExists = await clientsRepository.findOne(client_id);
    const productsExists = await productsRepository.findOne(product_id)
    if(!productsExists) {
      throw new Error("Esse produto nao esta cadastrado no sistema!")
    }
    if(!clientsExists) {
      throw new Error("Esse fornecedor nao esta cadastrado no sistema!")
    }
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
    }else {
      const balanceInventory = repository.create({
        product_id,
        amount
      })
      repository.save(balanceInventory);
    }
    const salesOrders = salesOrdersServiceRepository.create({
      client_id,
      product_id,
      amount,
      saleDate
    })

    await salesOrdersServiceRepository.save(salesOrders)
    
    return salesOrders
  }

  async index() {
    const salesOrdersRepository = getCustomRepository(SalesOrdersRepository);
    const salesOrders = await salesOrdersRepository.find({
      relations: ['client', 'product']
    });
    return salesOrders;
  }

  async show({ id }: ISalesOrdersServicesShow) {
    const salesOrdersRepository = getCustomRepository(SalesOrdersRepository);
    const salesOrders = await salesOrdersRepository.findOne(
      { id },
      {
        relations: ['client', 'product']
      }
    )

    if (!salesOrders) {
      throw new Error('Pedido de venda não encontrado')
    }

    return salesOrders
  }
  async update(id: string, {amount,client_id,product_id,saleDate} : ISalesOrdersServiceUpdate) {
    const repository = getCustomRepository(SalesOrdersRepository);
    await repository.update(id, {
      amount,
      client_id,
      product_id,
      saleDate
    });
    const fileUpdated = await repository.findOne({where:{id}, select: ['id', 'product_id', 'client_id', 'saleDate', 'amount']});
    return fileUpdated;
  }
  async delete(id : string) {
    const repository = getCustomRepository(SalesOrdersRepository);
    const repositoryBalanceInventory = getCustomRepository(BalanceInventoryRepository);
    const saleOrder = await repository.findOne({where: {id}});
    const balanceInventory = await repositoryBalanceInventory.findOne({where: {
      product_id: saleOrder.product_id
    }});
    
    if(balanceInventory) {
      const currentAmount = balanceInventory.amount;
      await repositoryBalanceInventory.update(balanceInventory.id, {
        amount: currentAmount - saleOrder.amount > 0 ? currentAmount - saleOrder.amount : 0
      })
    }
    const fileDestroyed = await repository.delete(id);
    if(fileDestroyed.affected == 0 ) {
      throw new Error("Produto nao encontrado!")
    }
    return fileDestroyed;
  }
}



export { SalesOrdersService }