import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authetication/remote-authetication-factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'

export const makeLogin: React.FC = () => {
  return (<Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()} />)
}
