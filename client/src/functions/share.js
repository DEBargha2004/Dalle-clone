const handleShare = async (item, formData,setLoggedIn) => {
    let imagedata = item.imagedata.split(',')[1]
    let prompt = formData.prompt
    let username = formData.name
    let data = JSON.stringify({
        imagedata,
        prompt,
        username
    })
    let response = await fetch('http://localhost:4000/share', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data,
        credentials:'include'
    })
    response = await response.json()
    if (response.message === 'loginfail') {
        setLoggedIn(false)
        alert(response.message)
    }
}

export default handleShare;