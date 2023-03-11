import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import logouter from '../functions/logouter'


const Header = ({setLoggedIn,navigate}) => {
  return (
    <div className='flex justify-between p-4 shadow-md shadow-[#adadad18] h-[10%] w-full'>
      <Link to='/' className=''>
        <img src='https://seeklogo.com/images/O/open-ai-logo-FB5E1C8309-seeklogo.com.png' alt='openai-logo' className='h-7' />
      </Link>
      <div
      className='w-[16.5%] flex justify-between items-center'
      >
        <Link to='Create'>
          <Button
            variant='contained'
            className='bg-blue-500'
          >Create</Button>
        </Link>
        <Button
        variant='contained'
        className='bg-slate-500'
        endIcon={<Logout />}
        onClick={()=>logouter(setLoggedIn,navigate)}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Header;