import VueImageLazy from './vue-image-lazy'

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0
}

export default {
  install (Vue, options = {}) {
    Vue.directive('image-lazy', VueImageLazy(Object.assign({}, defaultOptions, options)))
  }
}
