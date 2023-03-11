import React from 'react'

const Input = ({ field, placeholder, setFormData,formData,bool}) => {
    return (
        <input
            placeholder={placeholder}
            onChange={(e) => setFormData(prev => (
                {
                    ...prev,
                    [field] : e.target.value
                }
            ))}
            value={formData[field]}
            className={` mt-5 mb-5 p-2 text-slate-700 text-[16px] outline-none ${field !== 'prompt' ? 'rounded-lg w-[300px]' : 'w-[90%] rounded-l-lg rounded-r-none'} caret-slate-700 shadow-lg ${bool ? '' : 'shadow-red-300'}`}
        />
    )
}

export default Input