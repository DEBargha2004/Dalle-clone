const logouter = async (setLoggedIn,navigate) => {
    let response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials:'include'
    })
    response = await response.json()
    await setLoggedIn(false)
    navigate('/')
}

export default logouter;