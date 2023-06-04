import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/context'
import { mockAccountModel } from '../../domain/mocks'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
      <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
        <Router history={history}>
          <PrivateRoute />
        </Router>
      </ApiContext.Provider>
  )

  return { history }
}

describe('Private Route', () => {
  it('Should redirect to /login if token is empty', async () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should render current component if token is not empty', async () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
