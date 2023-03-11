const callFirst = async (setLoggedIn) => {
    let response = await fetch('http://localhost:4000/firstreq', {
        credentials: 'include'
    })
    response = await response.json()
    if (response.message === 'success') {
        setLoggedIn(true)
    } 
}
export default callFirst;