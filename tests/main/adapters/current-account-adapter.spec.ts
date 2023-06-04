import { UnexpectedError } from '@/domain/errors'
import { LocalStorageAdapter } from '@/infra/cache'
import { setCurrentAccountAdapter } from '@/main/adapters'
import { mockAccountModel } from '@/tests/domain/mocks'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  it('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
    expect(setSpy).toHaveBeenCalledTimes(1)
  })

  it('Should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })
})
