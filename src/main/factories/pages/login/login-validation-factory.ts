import { ValidationComposite } from '@/validation/validation-composite'
import { ValidationBuilder as Builder } from '@/validation/builder'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(2).build()
  ])
}
