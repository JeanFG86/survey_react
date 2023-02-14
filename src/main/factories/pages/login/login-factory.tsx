import React from 'react'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/usecases'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { ValidationComposite } from '@/validation/validation-composite'
import { ValidationBuilder } from '@/validation/builder'

export const makeLogin: React.FC = () => {
  const url = 'http://localhost:5050/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(2).build()
  ])
  return (<Login
    authentication={remoteAuthentication}
    validation={validationComposite} />)
}
