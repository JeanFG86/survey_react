import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Context from '@/presentation/context/form/form-context'
import Input from '@/presentation/components/input/input'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
      <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
      </Context.Provider>)
}

describe('Input Component', () => {
  it('Should begin with readOnly', async () => {
    const field = faker.database.column()
    const input = makeSut(field).getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('Should remove readOnly on focus', async () => {
    const field = faker.database.column()
    const input = makeSut(field).getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
