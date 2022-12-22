import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class HttpPostClientSpy implements HttpPostClient{
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.unathorized
  }

  async post (params: HttpPostParams): Promise<HttpResponse>{
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
