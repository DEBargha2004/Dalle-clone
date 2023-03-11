import { surpriseMePrompts } from "../constants/defaultvalue"

const randomName = (formData,setFormData) => {
    let random_num = Math.floor(Math.random() * 50)
    let random_Prompt = surpriseMePrompts[random_num]
    setFormData({
        ...formData,
        prompt: random_Prompt
    })
}

export default randomName;