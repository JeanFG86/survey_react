import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '../../domain/mocks'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
