/* eslint-disable */
class Scripts {
  constructor (urls) {
    this.urls = []
    typeof urls == 'array' ? this.urls.concat(urls) : this.urls.push(urls)
    this.delay = 300
  }
  installScript (url) {
    return new Promise((resolve) => {
      var script = document.createElement('script')
      script.src = url
      script.onreadystatechange = script.onload = () => {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(() => {
            resolve()
          }, this.delay)
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
  init () {
    var scripts = this.urls.map( url => {
      this.installScript(url)
    })
    return Promise.all(scripts)
  }
}

export default Scripts
