import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): Error {
    return new InvalidFieldError()
  }
}
