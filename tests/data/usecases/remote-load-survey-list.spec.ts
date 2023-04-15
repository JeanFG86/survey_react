import { RemoteLoadSurveyList } from '@/data/usecases'
import { HttpGetClientSpy } from '@/tests/data/mocks'
import faker from 'faker'

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
