export default function({ $axios, state, getters, commit, dispatch }){
    let request = null
    if (!getters.hadLogin) {
        console.log("啦啦啦啦啦--====")
        this.$errorMessage("请先登录！")
        this.$router.push(`/login`)
    } 
}