import { RemoteLoadSurveyList } from '@/data/usecases'
import { UnexpectedError } from '@/domain/errors'
import { HttpGetClientSpy } from '@/tests/data/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  it('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a list of SurveyModels if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockSurveyListModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    await expect(surveyList).toEqual(httpResult)
  })

  it('Should return an empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const surveyList = await sut.loadAll()
    await expect(surveyList).toEqual([])
  })
})
