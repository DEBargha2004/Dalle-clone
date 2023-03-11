const size = (rows = 1) => {
    let windowHeight = window.innerHeight
    return (
        {
            height: rows === 2 ? windowHeight * 0.3 * rows : (windowHeight * 0.3 * 2 * rows - 4) / 2,
        }
    )
}

export default size