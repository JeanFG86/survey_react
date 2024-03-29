import { ValidationComposite } from '@/validation/validation-composite'
import { ValidationBuilder as Builder } from '@/validation/builder'
import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(2).build(),
        ...Builder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build()
      ])
    )
  })
})
