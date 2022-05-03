import { useField } from '../hooks'
import { omit } from 'lodash'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setPage, setToken }) => {
  const username = useField('text')
  const password = useField('password')

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('error', error)
    },
    onCompleted: (data) => {
      setToken(data.login.value)
      window.localStorage.setItem('library-user-token', data.login.value)
      setPage('authors')
    },
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    await login({
      variables: {
        username: username.value,
        password: password.value,
      },
    })
    username.reset()
    password.reset()
    console.log('logged in')
  }

  if (!show) return null

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...omit(username, 'reset')} />
        </div>
        <div>
          password
          <input {...omit(password, 'reset')} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
