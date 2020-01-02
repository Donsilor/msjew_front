export default function({ req, res, route, store, redirect }) {
  if (!store.state.token) {
    let lastUrl = ''
    if (process.server) {
      lastUrl = req.originalUrl || ''
      if (lastUrl) {
        res.setHeader('Set-Cookie', [`lastUrl=${lastUrl}; Path=/;`])
        store.commit('setLastUrl', lastUrl)
      }
    } else {
      lastUrl = route.fullPath
      store.commit('setLastUrl', lastUrl)
    }
    redirect('/login')
  }
}
