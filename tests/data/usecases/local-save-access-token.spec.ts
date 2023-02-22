import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import faker from 'faker'

interface SetStorage {
  set: (key: string, value: any) => Promise<void>
}

class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}

class SetStorageSpy implements SetStorage {
  key: string
  value: any
  async set(key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}

describe('LocalSaveAccessToken', () => {
  it('Should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
