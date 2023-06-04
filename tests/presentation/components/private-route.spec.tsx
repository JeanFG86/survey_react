import React from 'react'
import { render } from '@testing-library/react'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>
  )

  return { history }
}

describe('Private Route', () => {
  it('Should redirect to /login if token is empty', async () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
