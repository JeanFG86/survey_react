import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication{
  constructor (private readonly url: string, private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>) { }

  async auth (params: AuthenticationParams): Promise<void>{
    const HttpResponse = await this.httpPostClient.post({ url: this.url, body: params })
    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
