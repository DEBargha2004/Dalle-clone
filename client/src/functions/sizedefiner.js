const sizedefiner = (arrayBlock) => {
    for (let i = 0; i < arrayBlock.length; i++) {
        let array = arrayBlock[i]
        if (i % 2 === 0) {
            for (let j = 0; j < array.length; j++) {
                if (j % 3 === 0) {
                    if (j === 0) {
                        array[j].rows = 2
                        array[j].cols = 2
                    } else {
                        array[j].cols = 2
                    }
                }
            }
        } else {
            for (let j = 0; j < array.length; j++) {
                if (j === 0) {
                    array[j].cols = 2
                } else if (j === 1) {
                    array[j].rows = 2
                    array[j].cols = 2
                }
            }
        }
    }
    let newArray = []
    for(let array of arrayBlock){
        newArray.push(...array)
    }
    return (
        newArray
  )
}

export default sizedefiner;