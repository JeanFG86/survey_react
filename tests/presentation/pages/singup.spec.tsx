import React from 'react'
import { SignUp } from '@/presentation/pages'
import { ApiContext } from '@/presentation/context'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { AddAccountSpy, Helper, ValidationStub } from '@/tests/presentation/mocks'
import faker from 'faker'
import { populateField } from '../mocks/form-helper'
import { EmailInUseError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  render(
     <ApiContext.Provider value ={{ setCurrentAccount: setCurrentAccountMock }}>
    <Router history={history}>
      <SignUp
        validation={validationStub}
        addAccount={addAccountSpy}
      />
      </Router>
      </ApiContext.Provider>
  )
  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisable('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('Should show name error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  it('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('Should show email password if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('Should show email passwordConfirmation if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

   it('Should valid name state if validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
   })

  it('Should valid email state if validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('Should valid password state if validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('Should valid passwordConfirmation state if validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisable('submit', false)
  })

  it('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  it('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testElementTest('main-error', error.message)
    Helper.testChildCount('error-wrap', 1)
  })

  it('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('Should go to login page', async () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
