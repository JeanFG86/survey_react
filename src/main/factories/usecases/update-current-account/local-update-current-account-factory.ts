import { LocalUpdateCurrentAccount } from '@/data/usecases'
import { UpdateCurrentAccount } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}