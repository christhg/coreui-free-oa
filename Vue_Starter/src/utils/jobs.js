// 設定工作排程時間
// export function doGetCountJob (second) {
//     setInterval(() => {
//         store.dispatch('GetWaitingCount', {userId: store.getters.uid, pubCompanyId: store.getters.pub_company_id})
//     }, second * 1000)
// }

let jobs = {
    job: null,
    start (callback, second) {
        this.job = setInterval(callback, second * 1000)
    },
    stop () {
        clearInterval(this.job)
    }
}

export default jobs
