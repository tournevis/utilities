class Animate {
  constructor (obj) {
    this.duration = 400
  }
  linear (t) { return t }
  easeInQuad (t) { return t*t }
  easeOut (t) { return t*(2-t) }
  easeInOutCubic (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
  to (el, duration = 400, obj = {}) {
    if (!el) return
    this.startTime = Date.now()
    this.duration = duration
    this.callback = obj.callback
    this.updateCallback = obj.updateCallback
    this.el = el
    this.loop()
  }
  loop () {
    var timeline = (Date.now() - this.startTime) / this.duration
    var timelineMin = Math.min(timeline, 1)
    var easing = this.easeInOutCubic(timelineMin)
    if (timelineMin !== 1) {
      this.updateCallback && this.updateCallback(this.el, easing)
      window.requestAnimationFrame(this.loop.bind(this))
    } else {
      this.callback && this.callback(this.el, easing)     
    }
  }
}

export default new Animate()
