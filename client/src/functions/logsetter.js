const logsetter = (e, setLoggedIn, navigate) => {
    if (e.message === 'success') {
        setLoggedIn(true)
        navigate('/')
    } else {
        alert(e.message)
    }
}

export default logsetter;