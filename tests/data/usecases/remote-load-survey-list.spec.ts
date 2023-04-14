import faker from 'faker'

class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll(): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}

type HttpGetParams = {
  url: string
}

interface HttpGetClient {
  get: (params: HttpGetParams) => Promise<void>
}

class HttpGetClientSpy implements HttpGetClient {
  url: string
  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
