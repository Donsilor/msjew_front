export default function({ $axios, store }) {
  $axios.onRequest(config => {
    // if (config.params) {
    //   for (const n in config.params) {
    //     console.log(
    //       config.params[n] + '======>' + encodeURIComponent(config.params[n])
    //     )
    //     config.params[n] = encodeURIComponent(config.params[n])
    //   }
    // // }
    // let refreshToken=localStorage.getItem('refreshToken')
    // let time=localStorage.getItem("expirationTime");
    // if(time>=7200){
    //   refreshToken=store.state.token
    //   // console.log(store.state.token)
    // }
    // setInterval(() => {
      
    // }, 1200000);
    // console.log('refreshToken=======>',refreshToken)
    // console.log('time=======>',time)
    // console.log('token=======>',store.state.token)
    // console.log('coin=======>', store.state.coin)
    // console.log('language=======>', store.state.language)

    config.headers['x-api-key'] = store.state.token || ''
    config.headers['x-api-currency']= store.state.coin || ''
    config.headers['x-api-language'] = store.state.language || ''
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  })



  $axios.onResponse(res => {
    const data = res.data || {}
    
    // console.log("refreshToken",refreshToken)
    if (data.hasOwnProperty('code')) {
      if (data.code == 200) {
        return Promise.resolve(
          ![undefined].includes(data) ? data : null
        ) 
        // return Promise.resolve(data.data || null)
      } else {
        if (data.code == 401) {
          // const refreshToken =localStorage.getItem('refreshToken')
          // store.dispatch('refreshTokenRequst') //刷新token

          console.log('is 401')
          // store.dispatch('logout')
          // this.$router.push('/login')
          
        }else{
          return Promise.reject(new Error(data.message|| 'something error'))
        }
        
      }
    } else {
      return Promise.resolve(data || null)
    }
  })
  $axios.onError(error => {
    // console.log('$axios.onError===>', error)
    return Promise.reject(error)
  })
}
