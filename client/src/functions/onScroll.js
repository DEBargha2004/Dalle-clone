import fetchApi from "./fetchApi"

const onScroll = (event,index, Fetching, setLoggedIn, setItemData) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target.scrollingElement
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (!Fetching.current) {
            Fetching.current = true
            fetchApi(index, Fetching, setLoggedIn, setItemData)
        }
    }
}
export default onScroll;