import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication{
  constructor (private readonly url: string, private readonly httpPostClient: HttpPostClient) { }

  async auth (params: AuthenticationParams): Promise<void>{
    const HttpResponse = await this.httpPostClient.post({ url: this.url, body: params })
    switch (HttpResponse.statusCode) {
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: return await Promise.resolve()
    }
  }
}
