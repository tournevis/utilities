class Request {
  constructor (url = '') {
    this.url = url
    this.headers = []
    this.validStatus = [200, 201]
  }
  setUrl (url) {
    this.url = url 
  }
  createXHR (path, type) {
    var xhr = new XMLHttpRequest()
    var computedUrl = this.url + path
    xhr.open(type, computedUrl, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    this.headers.forEach(el => {
      xhr.setRequestHeader(el.key, el.value)
    })
    return xhr
  }
  setHeader (headers) {
    this.headers = headers.concat(this.headers)
  }
  removeHeader (header) {
    this.headers = this.headers.filter(h => h.key !== header.key)
  }
  post (url, args) {
    return new Promise((resolve, reject) => {
      var req = this.createXHR(url, 'POST')
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE && this.validStatus.indexOf(req.status))  {
          resolve(JSON.parse(req.response))
        } else if (req.readyState === XMLHttpRequest.DONE && this.validStatus.indexOf(req.status) == -1) {
          console.log(req.statusText, req.responseText)
          reject(req.response)
        }
      }
      req.send(JSON.stringify(args))
    })
  }
  get (url, args) {
    return new Promise((resolve, reject) => {
      var req = this.createXHR(url, 'GET')
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE && this.validStatus.indexOf(req.status)) {
          resolve(JSON.parse(req.response))
        } else if (req.readyState === XMLHttpRequest.DONE && this.validStatus.indexOf(req.status) == -1) {
          console.log(req.statusText, req.responseText)
          reject(req.response)
        }
      }
      req.send(JSON.stringify(args))
    })
  }
}

export default new Api()
