import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/compare-fields'
import faker from 'faker'

const makeSut = (): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column())

describe('CompareFieldsValidation', () => {
  it('Should return error if compare is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
