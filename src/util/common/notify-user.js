import { error, requestError, verifyEmail, notFound, wrongFormat } from "../../asset/static/notify"
import store from "../../hook/store"
import { changeStatus } from "../../hook/redux-slice/Notify"


export function showNotification(type, stock) {
    if (type === "request") {
        store.dispatch(changeStatus({ status: true, content: requestError }))
    }
    else if (type === "verify") {
        store.dispatch(changeStatus({ status: true, content: verifyEmail }))
    }
    else if (type === "error") {
        store.dispatch(changeStatus({ status: true, content: error }))
    }
    else if (type === "notfound") {
        store.dispatch(changeStatus({ status: true, content: notFound(stock) }))
    }
    else if (type === "wrong") {
        store.dispatch(changeStatus({ status: true, content: wrongFormat }))
    }
    setTimeout(() => {
        store.dispatch(changeStatus({ status: false, content: null }))
    }, 4000)
}