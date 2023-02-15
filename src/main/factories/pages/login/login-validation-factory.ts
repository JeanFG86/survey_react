import { ValidationComposite } from '@/validation/validation-composite'
import { ValidationBuilder } from '@/validation/builder'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(2).build()
  ])
}
