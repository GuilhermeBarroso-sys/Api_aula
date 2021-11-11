import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../repositories/ProductsRepository'

interface IProductsCreate {
  product: string;
  unitMeasurement: string;
}

interface IProductUpdate {
  product: string;
  unitMeasurement : string
}

class ProductsServices {

  async create({ product, unitMeasurement }: IProductsCreate) {
    const productsRepository = getCustomRepository(ProductsRepository)
    const products = productsRepository.create({
      product,
      unitMeasurement
    })
    await productsRepository.save(products)
    return products
  }

  async index() {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();
    return products;
  }
  async show(id: string) {
    const repository = getCustomRepository(ProductsRepository);
    const product = await repository.findOne({
      where: {
        id
      }
    });
    return product; 
  }
  async update(id: string, {product,unitMeasurement} : IProductUpdate) {
    const repository = getCustomRepository(ProductsRepository);
    await repository.update(id, {
      product,
      unitMeasurement
    });
    const fileUpdated = await repository.findOne({where:{id}, select: ['id', 'product', 'unitMeasurement']});
    return fileUpdated;
  }
  async delete(id : string) {
    const repository = getCustomRepository(ProductsRepository);
    const fileDestroyed = await repository.delete(id);
    if(fileDestroyed.affected == 0 ) {
      throw new Error("Produto nao encontrado!")
    }
    return fileDestroyed;
  }
}

export { ProductsServices }