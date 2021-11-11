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
//
routes.post('/clients', clientsController.create)
routes.get('/clients', clientsController.index)
routes.get('/clients/:id', clientsController.show)
routes.put('/clients/:id', clientsController.update)
routes.delete('/clients/:id', clientsController.delete)

routes.post('/salesorders', salesOrdersController.create)
routes.get('/salesorders', salesOrdersController.index)
routes.get('/salesorders/:id', salesOrdersController.show)
routes.put('/salesorders/:id', salesOrdersController.update)
routes.delete('/salesorders/:id', salesOrdersController.delete)
//
routes.post('/products', productsController.create)
routes.get('/products', productsController.index)
routes.get('/products/:id', productsController.show)
routes.put('/products/:id', productsController.update)
routes.delete('/products/:id', productsController.delete)


//
routes.post('/balanceinventory', balanceInventoryController.create);
routes.get('/balanceinventory', balanceInventoryController.index);
routes.get('/balanceinventory/:id', balanceInventoryController.show);
routes.put('/balanceinventory/:id', balanceInventoryController.update);
routes.delete('/balanceinventory/:id', balanceInventoryController.delete);

export { routes }