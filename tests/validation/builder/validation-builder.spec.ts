import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field'

class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
