import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/min-length'
import faker from 'faker'

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  it('Should return error if value invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if value valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  it('Should return falsy if field does nor exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({
      [faker.database.column()]: faker.random.alphaNumeric(5)
    })
    expect(error).toBeFalsy()
  })
})
