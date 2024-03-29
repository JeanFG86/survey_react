import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { AddAccount } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteAddAccount } from '@/data/usecases/remote-add-account'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
