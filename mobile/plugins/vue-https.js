const isServer = process.server

function redirectHttps() {
  if ('https:' !== document.location.protocol) {
    let url = window.location.host
    url = 'https://' + url
    window.location.href = url
  }
}

if(!isServer) {
  redirectHttps()
}

