import { FieldValidation } from '@/validation/protocols'

class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): Error {
    return new InvalidFieldError()
  }
}

class InvalidFieldError extends Error {
  constructor() {
    super('valor inválido')
  }
}

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
