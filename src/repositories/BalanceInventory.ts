import { EntityRepository, Repository } from 'typeorm'
import { BalanceInventory } from '../entities/BalanceInventory'

@EntityRepository(BalanceInventory)
class BalanceInventoryRepository extends Repository<BalanceInventory> {

}

export { BalanceInventoryRepository }