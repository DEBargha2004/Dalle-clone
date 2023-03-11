import logsetter from "./logsetter"

const handleSubmit = async (e, formData, setComp, setLoggedIn, navigate) => {
    e.preventDefault()
    formData.email ? setComp(prev => ({ ...prev, compEmail: true })) : setComp(prev => ({ ...prev, compEmail: false }))
    formData.password ? setComp(prev => ({ ...prev, compPassword: true })) : setComp(prev => ({ ...prev, compPassword: false }))
    if (formData.email && formData.password) {
        let response = await fetch('http://localhost:4000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        response = await response.json()
        logsetter(response, setLoggedIn, navigate)
    }
}

export default handleSubmit;