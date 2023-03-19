import { RequiredFieldValidation } from '@/validation/validators/required-field'
import { ValidationBuilder } from '@/validation/builder'
import { EmailValidation } from '@/validation/email'
import { MinLengthValidation } from '@/validation/min-length'
import { CompareFieldsValidation } from '@/validation/compare-fields'
import faker from 'faker'

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  it('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).min(5).build()
    expect(validations).toEqual([new MinLengthValidation(field, 5)])
  })

  it('Should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = ValidationBuilder.field(field)
      .sameAs(fieldToCompare)
      .build()
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare)
    ])
  })

  it('Should return a list of validatios', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field)
      .required()
      .min(5)
      .email()
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, 5),
      new EmailValidation(field)
    ])
  })
})
