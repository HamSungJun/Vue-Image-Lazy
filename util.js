export const processBinding = (el, binding) => {
  if (isValidBindingValue(el, binding)) {
    return {
      src: binding.value.src,
      beforeLoad: typeof binding.value.beforeLoad === 'function' ? binding.value.beforeLoad : defaultBeforeLoad,
      afterLoad: typeof binding.value.afterLoad === 'function' ? binding.value.afterLoad : defaultAfterLoad
    }
  }
}

const isValidBindingValue = (el, binding) => {
  let isValid = true
  if (!(el instanceof HTMLImageElement)) {
    console.error('[vue-image-lazy] : 디렉티브의 대상 요소가 이미지 태그가 아닙니다.')
    isValid = false
  } else if (!('value' in binding)) {
    console.error('[vue-image-lazy] : 디렉티브 파라미터가 입력되지 않았습니다.\n예시: v-image-lazy="{src: [String], beforeLoad: [Function], afterLoad: [Function]}"')
    isValid = false
  } else if (!('src' in binding.value)) {
    console.error('[vue-image-lazy] : 디렉티브 파라미터 객체의 src 키값은 필수로 입력해야 합니다.')
    isValid = false
  } else if (typeof binding.value.src !== 'string') {
    console.error('[vue-image-lazy] : 디렉티브 파라미터 객체의 키 [src]의 타입은 문자열(String)이 요구됩니다.')
    isValid = false
  }
  return isValid
}

const defaultBeforeLoad = (el) => {
  el.style.minHeight = '450px'
  return console.log('default-before-load')
}

const defaultAfterLoad = (el) => {
  el.style.minHeight = 'auto'
  return console.log('default-after-load')
}

export const onIntersect = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const $image = entry.target
      const imageSrc = $image.getAttribute('data-src')
      $image.src = imageSrc
      observer.unobserve($image)
    }
  })
}
