import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/min-length'
import faker from 'faker'

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  it('Should return error if value invalid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if value valid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
