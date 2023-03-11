import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Create from './pages/Create'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import removeLocalStorage from './functions/removeLocalStorage'
import callFirst from './functions/callFirst'
import callApi from './functions/callApi'
import { useNavigate } from 'react-router-dom'

const App = () => {

  let Fetching = useRef(false)

  let pending = useRef(false)

  const navigate = useNavigate()

  const [imageData, setImageData] = useState(null)

  const [itemData, setItemData] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    prompt: '',
    compPrompt: true,
    isLoading: false,
  })

  const [loggedin, setLoggedIn] = useState(false)



  useEffect(() => {
    window.addEventListener('beforeunload', () => removeLocalStorage())
    return () => window.removeEventListener('beforeunload', removeLocalStorage())
  }, [])

  useEffect(() => {
    callFirst(setLoggedIn)
  }, [])

  return (
    <>
      {loggedin && <Header setLoggedIn={setLoggedIn} navigate={navigate} />}
      <Routes>
        {
          loggedin ?
            <>
              <Route path='/' element={<Home
                itemData={itemData}
                setItemData={setItemData}
                Fetching={Fetching}
                setLoggedIn={setLoggedIn}
                loggedin={loggedin}
              />} />
              <Route path='/Create' element={<Create
                caller={() => callApi(pending, formData, navigate, setLoggedIn, setImageData, setFormData)}
                setFormData={setFormData}
                formData={formData}
                imageData={imageData}
                setImageData={setImageData}
                setLoggedIn={setLoggedIn}
                loggedin={loggedin}
              />} />
            </>
            :
            <>
              <Route
                path='/signup'
                element={<Signup setLoggedIn={setLoggedIn} navigate={navigate} />}
              />
              <Route
                path='/'
                element={<Signin setLoggedIn={setLoggedIn} navigate={navigate} />}
              />
            </>
        }
      </Routes>
    </>
  )
}

export default App;