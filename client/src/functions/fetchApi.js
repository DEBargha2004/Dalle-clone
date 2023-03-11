const fetchApi = async (index, Fetching, setLoggedIn, setItemData) => {
    let response = await fetch('http://localhost:4000/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: index.current }),
        credentials: 'include'
    })
    response = await response.json()
    if (response.message === 'loginfail') {
        alert(response.message)
        setLoggedIn(false)
        Fetching.current = false
    } else {
        let currentMessage = response.message;
        let curData = currentMessage[currentMessage.length - 1].imageNum;
        index.current = curData;
        setItemData(prev => ([...prev, ...response.message]))
        Fetching.current = false
    }
}
export default fetchApi;