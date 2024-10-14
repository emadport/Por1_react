import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import './Login.scss'
import Input from 'components/Input'
import Button from 'components/Button'
import { Link } from 'react-router-dom'
import Info from 'components/Info'
import useAuth from 'hooks/Auth.hook'
import SimpleLoading from 'components/Loading'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(true)
  const [error, setError] = useState('')

  const { signIn, loginLoading, userData, loginError, currentUserError } =
    useAuth()

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)

    setError('')
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)

    setError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    // Basic email format validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailPattern.test(email)
    if (email === '' && !isEmailValid) {
      setIsFormValid(false)
      setError('Email is not a valid email')
    } else if (password === '') {
      setIsFormValid(false)
      setError('Fill the password please')
    } else {
      setIsFormValid(true)
      setError('')
      try {
        await signIn({ email, password }, 10)
      } catch (error) {
        setIsFormValid(false)
        setError('Error on login')
      }
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <label className="login-container__label">Welcome Back!</label>
      <form onSubmit={handleSubmit}>
        <span style={{ marginBottom: '0.5rem', width: '100%' }}>
          {' '}
          <Input
            placeholder="Enter your email"
            label="Email"
            value={email}
            handleChange={handleEmailChange}
          />
        </span>

        <Input
          type="password"
          placeholder="Enter your Password"
          label="Password"
          value={password}
          handleChange={handlePasswordChange}
        />
        {loginLoading && <SimpleLoading />}
        {loginError && !loginLoading && (
          <Info type="error">{'Username or Password are incorrect'}</Info>
        )}
        {error && <Info type="error">{error}</Info>}
        {userData?.login?.token && !loginLoading && (
          <Info type="success">Login succeed</Info>
        )}
        <Button
          type="submit"
          width="100%"
          label="Login"
          loading={loginLoading}
        />
      </form>
      <div className="forgot-password-container">
        <Link className="forgot-password-link" to="/auth/reset/password/null">
          Forgot your password?
        </Link>
      </div>
    </div>
  )
}
