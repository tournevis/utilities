class Observer {
  constructor (className) {
    let images = document.querySelectorAll(className)
    this.images = Array.from(images)
    this.config = {
    }

    this.images.forEach(img => {
      this.preload(img)
    })
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.intersect.bind(this))
      this.images.forEach(img => {
        this.observer.observe(img)
      })
    } else {
      this.images.forEach(img => {
        this.display(img)
      })
    }
  }
  intersect (entries, observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        this.display(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }
  display(image) {
    image.classList.add('display')
  }
  preload (image) {
    image.onload = function (img) {
      image.classList.add('loaded')
    }
    image.src = image.dataset.src
  }
}
export default Observer