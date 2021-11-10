import { getCustomRepository } from 'typeorm'
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
        relations: ['client']
      }
    )

    if (!salesOrders) {
      throw new Error('Pedido de venda não encontrado')
    }

    return salesOrders
  }

}

export { SalesOrdersService }