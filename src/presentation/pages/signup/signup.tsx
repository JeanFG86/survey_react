import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Header, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation?: Validation
  addAccount?: AddAccount
  updateCurrentAccount?: UpdateCurrentAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount, updateCurrentAccount }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    nameError: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: ''
  })
  useEffect(() => {
      const { name, email, password, passwordConfirmation } = state
      const formData = { name, email, password, passwordConfirmation }
      const nameError = validation.validate('name', formData)
      const emailError = validation.validate('email', formData)
      const passwordError = validation.validate('password', formData)
      const passwordConfirmationError = validation.validate('passwordConfirmationError', formData)
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
   }, [state.name, state.email, state.password, state.passwordConfirmation])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
     event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await updateCurrentAccount.save(account)
      history.replace('/')
    } catch (error) {
       setState({ ...state, isLoading: false, mainError: error.message })
    }
  }
  return (
    <div className={Styles.signupWrap}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <SubmitButton text='Cadastrar'/>
       <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar para Login</Link>
        <FormStatus />
      </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
