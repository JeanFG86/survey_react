import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Context from '@/presentation/context/form/form-context'
import Input from '@/presentation/components/input/input'

const makeSut = (): RenderResult => {
  return render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>)
}

describe('Input Component', () => {
  it('Should begin with readOnly', async () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
