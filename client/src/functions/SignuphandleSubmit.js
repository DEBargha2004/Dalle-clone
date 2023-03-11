import logsetter from "./logsetter"

const handleSubmit = async (e, formData, setComp, setLoggedIn, navigate) => {
    e.preventDefault()
    formData.firstname ? setComp(prev => ({ ...prev, compFirstname: true })) : setComp(prev => ({ ...prev, compFirstname: false }))
    formData.lastname ? setComp(prev => ({ ...prev, compLastname: true })) : setComp(prev => ({ ...prev, compLastname: false }))
    formData.email ?
        formData.email.includes('@') ?
            setComp(prev => ({ ...prev, compEmail: true })) :
            setComp(prev => ({ ...prev, compEmail: false })) :
        setComp(prev => ({ ...prev, compEmail: false }))
    formData.password ? setComp(prev => ({ ...prev, compPassword: true })) : setComp(prev => ({ ...prev, compPassword: false }))
    formData.confirmPassword ? setComp(prev => ({ ...prev, compConfirmPassword: true })) : setComp(prev => ({ ...prev, compConfirmPassword: false }))

    if (formData.firstname && formData.lastname && formData.email.includes('@') && formData.password && formData.confirmPassword) {
        let response = await fetch('http://localhost:4000/signup', {
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