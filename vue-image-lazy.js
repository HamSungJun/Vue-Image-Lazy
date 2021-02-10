import {
  processBinding,
  onIntersect
} from './util'

let observer = null
export default (options) => {
  observer = new IntersectionObserver(onIntersect, options)
  return {
    bind (el, binding) {
      const { src, beforeLoad, afterLoad } = processBinding(el, binding)
      el.setAttribute('data-src', src)
      beforeLoad(el)
      el.addEventListener('load', () => { afterLoad(el) })
    },
    inserted (el) {
      observer.observe(el)
    },
    unbind (el) {
      observer.unobserve(el)
    }
  }
}
