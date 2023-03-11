const Generate = (formData,setFormData) => {
    !formData.prompt ? setFormData(prev => ({ ...prev, compPrompt: false })) : setFormData(prev => ({ ...prev, compPrompt: true }))
    setFormData(prev => {
        let shouldLoad = prev.compPrompt 
        return (
            {
                ...prev,
                isLoading: shouldLoad
            }
        )
    })
}
export default Generate;