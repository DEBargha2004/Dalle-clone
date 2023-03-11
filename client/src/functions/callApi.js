const callApi = async (pending,formData,navigate,setLoggedIn,setImageData,setFormData) => {
    if (!pending.current) {
        pending.current = true
        let response = await fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: formData.prompt }),
            credentials: 'include'
        })
        response = await response.json()
        if (response.message === 'loginfail') {
            alert(response.message)
            navigate('/')
            setLoggedIn(false)
        } else {
            setFormData(prev => ({ ...prev, isLoading: !prev.isLoading }))
            setImageData(response.message)
            localStorage.setItem('generatedImage', JSON.stringify(response.message))
            localStorage.setItem('formData', JSON.stringify({ ...formData, isLoading: false }))
            pending.current = false
        }
    }
}
export default callApi;