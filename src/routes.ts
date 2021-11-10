import { Router } from 'express'

// PascalCase
import { ClientsController } from './controllers/ClientsController'
import { SalesOrdersController } from './controllers/SalesOrdersController'
import { ProductsController } from './controllers/ProductsController'
import { BalanceInventoryController } from './controllers/BalanceInventoryController'

const routes = Router()

// CamelCase 
const clientsController = new ClientsController()
const salesOrdersController = new SalesOrdersController()
const productsController = new ProductsController()
const balanceInventoryController = new BalanceInventoryController();
routes.post('/clients', clientsController.create)
routes.get('/clients', clientsController.index)
routes.get('/clients/:id', clientsController.show)
routes.delete('/clients/:id', clientsController.delete)
routes.put('/clients/:id', clientsController.update)

routes.post('/salesorders', salesOrdersController.create)
routes.get('/salesorders', salesOrdersController.index)
routes.get('/salesorders/:id', salesOrdersController.show)

routes.post('/products', productsController.create)
routes.get('/products', productsController.index)

routes.get('/balanceinventory', balanceInventoryController.index);
routes.post('/balanceinventory', balanceInventoryController.create);


export { routes }