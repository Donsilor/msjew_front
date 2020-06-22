export default function({
  req,
  res,
  redirect,
  store,
  route
}) {
  if (process.server) {
    var referer = req.headers.referer;
    
    var protocol,path,url;
    if(referer){
      protocol = referer.split('://')[0],
      path = referer.split('://')[1];

      if (protocol != 'https') {
        url = 'https://' + path;
      }
      redirect(url)
      return
    }
  }
}
