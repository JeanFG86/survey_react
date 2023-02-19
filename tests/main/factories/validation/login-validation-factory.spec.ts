import { EmailValidation } from '@/validation/email'
import { MinLengthValidation } from '@/validation/min-length'
import { ValidationComposite } from '@/validation/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators/required-field'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 2)
      ])
    )
  })
})
