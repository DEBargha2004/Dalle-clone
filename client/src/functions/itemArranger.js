const itemArranger = (array) => {
    let newArr = []
    let tempArr = []
    for (let i = 0; i < array.length; i++) {
        if (tempArr.length <= 3) {
            tempArr.push(array[i])
            if (i === array.length - 1) {
                newArr.push(tempArr)
            }
        } else {
            newArr.push(tempArr)
            tempArr = []
            tempArr.push(array[i])
            if (i === array.length - 1) {
                newArr.push(tempArr)
            }
        }
    }
    return (
        newArr
    )
}

export default itemArranger;