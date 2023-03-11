import React, { useState } from 'react'
import { Button, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import handleSubmit from '../functions/SigninhandleSubmit';

function Signin({setLoggedIn,navigate}) {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [comp, setComp] = useState({
    compEmail: true,
    compPassword: true
  })

  return (
    <div className='h-full w-full flex justify-center items-center' onSubmit={(e)=>handleSubmit(e,formData,setComp,setLoggedIn,navigate)}>
      <form className='flex justify-center items-center flex-col p-10 shadow-lg'>
        <AccountCircleIcon
          className='h-[120px] w-[120px] account mb-4'
        />
        <TextField
          error={!comp.compEmail}
          label='Email'
          className='w-[70%] m-2 min-w-[400px]'
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
        <TextField
          error={!comp.compPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          type={visible ? 'text' : 'password'}
          className='w-[70%] m-2 min-w-[400px]'
          label='Password'
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'
              >
                <IconButton
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          type='submit'
          variant='contained'
          className='bg-black m-[4%] w-[70%] min-w-[400px]'
        >
          Login
        </Button>
        <Link
          href='/signup'
          className='no-underline text-lg text-slate-600'
        >Didn't had an account</Link>
      </form>
    </div>
  )
}

export default Signin;