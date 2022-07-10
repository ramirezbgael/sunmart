import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const FormScreen = () => {

  const [isErrorLogin, setIsErrorLogin] = useState(false)

  const {handleSubmit, reset, register} = useForm()

  const submit = data =>{
    console.log(data)

    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/users/login'
    
    axios.post(URL, data)
      .then(res => {
        localStorage.setItem('token', res.data.data.token)
      })
      .catch(err => {
        localStorage.setItem('token', '')
        setIsErrorLogin(true)
        setTimeout(() =>{
          setIsErrorLogin(false)
        }, 5000)
      })
    reset({
      email: '',
      password: ''
    })
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit(submit)} className='login' action="">
        <ul>
          <li>
            <b>Email: </b>mason@gmail.com
          </li>
          <li>
            <b>Password: </b>mason1234
          </li>
        </ul>

        <h2>Enter your information</h2>
        <ul>
          <li>
            <label htmlFor="" className='login-label'>Email</label>
            <input
            type="text"
            className='login-input'
            id='login-email'
            {...register('email')}
            />
          </li>
          <li>
            <label htmlFor="" className='login-label'>Password</label>
            <input
            type="password"
            className='login-input'
            id='login-password'
            {...register('password')}
            />
          </li>
        </ul>

        <div>
        {
          isErrorLogin && 'Invalid credentials, try again'
        }
        </div>
        <button>Log in</button>
      </form>
    </div>
  )
}

export default FormScreen