import React, { useState } from 'react'
import { Button, IconButton, InputAdornment, TextField, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import handleSubmit from '../functions/SignuphandleSubmit';

function Signup({setLoggedIn,navigate}) {
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [warning, setWarning] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [comp, setComp] = useState({
    compFirstname: true,
    compLastname: true,
    compEmail: true,
    compPassword: true,
    compConfirmPassword: true,
  })


  return (
    <div className='h-full w-full flex justify-center items-center'>
      <form className='w-[40%] flex flex-col justify-center items-center p-10 pt-3 pb-5 shadow-lg' onSubmit={(e)=>handleSubmit(e,formData,setComp,setLoggedIn,navigate)}>
        <AccountCircleIcon
          className='h-[120px] w-[120px] account mb-4'
        />
        <TextField
          error={!comp.compFirstname}
          label='First Name'
          className='w-[70%] m-2 min-w-[400px]'
          onChange={(e) => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
        />
        <TextField
          error={!comp.compLastname}
          label='Last Name'
          className='w-[70%] m-2 min-w-[400px]'
          onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
        />
        <TextField
          error={!comp.compEmail}
          label='Email'
          className='w-[70%] m-2 min-w-[400px]'
          type={'email'}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
        <TextField
          error={!comp.compPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          label='Password'
          type={visible1 ? 'text' : 'password'}
          className='w-[70%] m-2 min-w-[400px]'
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'>
                <IconButton
                  onClick={() => setVisible1(!visible1)}
                >
                  {visible1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          error={!comp.compConfirmPassword}
          disabled={!formData.password}
          label='Confirm Password'
          type={visible2 ? 'text' : 'password'}
          className='w-[70%] m-2 min-w-[400px]'
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'>
                <IconButton
                  onClick={() => setVisible2(!visible2)}
                >
                  {visible2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={(e) => {
            setFormData(prev => ({...prev,confirmPassword:e.target.value}))
            if (e.target.value !== formData.password) {
              setWarning(true)
            } else {
              setWarning(false)
            }
          }}
        />
        <p className='text-sm text-red-600 w-[70%] min-w-[400px]'>{warning && 'Password not matched'}</p>
        <Button
          variant='contained'
          className='bg-black m-[4%] w-[70%] min-w-[400px]'
          type='submit'
        >
          Sign Up
        </Button>
        <Link
          href='/'
          className='no-underline text-lg text-slate-600'
        >Already had an account</Link>
      </form>
    </div>
  )
}

export default Signup;