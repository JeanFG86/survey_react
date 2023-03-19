import { RequiredFieldValidation } from '@/validation/validators/required-field'
import { RequiredFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should return false if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
