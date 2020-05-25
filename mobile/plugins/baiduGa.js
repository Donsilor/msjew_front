// 百度统计代码
export default ({app: {router}, store}) => {
    // console.log("baidu",store.state)
    /* 每次路由变更时进行pv统计 */
    if(store.state.platform == 20){
        console.log(111111)
        router.afterEach((to, from) => {
          /* 告诉增加一个PV */
          try {
            window._hmt = window._hmt || []
            window._hmt.push(['_trackPageview', to.fullPath])
          } catch (e) {
          }
        })
    }
  }