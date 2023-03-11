const handleDisplay = (setCur) => {
    setCur(prev => ({ ...prev, open: false }))
}

export default handleDisplay;