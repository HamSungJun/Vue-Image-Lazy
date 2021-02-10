# Vue-Image-Lazy
[Vue.js 의 커스텀 디렉티브](https://kr.vuejs.org/v2/guide/custom-directive.html) 기능을 통해 다음의 작업을 할 수 있습니다.
- Viewport에 노출된 이미지에 대한 지연 로딩
- 이미지 로딩 이전에 대한 동작 정의 및 실행
- 이미지 로딩 이후에 대한 동작 정의 및 실행

## Implementation Base
- [Intersection Observer Api](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
- [Can I Use](https://caniuse.com/?search=Intersection%20Observer)

## Installation
`@vue/cli`를 사용하는 개발 환경에서 이용가능합니다.
```
$ npm install vue-image-lazy -D
```

## Usage

- `기본`
```vue
<template>
    <div id="app">
        <div class="image-box">
        <div class="image-item" v-for="(imageSrc, index) in images" :key="index">
            <img v-image-lazy="{ src: imageSrc }" alt="your alt">
        </div>
        </div>
    </div>
</template>
```

- `이미지 로드 전/후에 대한 커스텀 함수 정의 및 할당`
```vue
<template>
  <div id="app">
    <div class="image-box">
      <div class="image-item" v-for="(imageSrc, index) in images" :key="index">
        <img v-image-lazy="{ src: imageSrc, beforeLoad: beforeLoad, afterLoad: afterLoad }" alt="your alt">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      images: [...]
    }
  },
  methods: {
    beforeLoad (el) {
      console.log(el)
      console.log('before-load')
    },
    afterLoad (el) {
      console.log(el)
      console.log('after-load')
    }
  }
}
</script>
```

## Remarks
> Intersection Observer 인스턴스에 디렉티브를 할당한 이미지 엘리먼트를 관찰 대상으로 등록한다. 페이지를 처음 로드하는 시점에서 이미지 혹은 이미지를 감싸는 부모 엘리먼트요소에 너비 혹은 높이 스타일 지정값이 없는경우 처음의 너비와 높이는 '0' 으로 시작하므로 렌더링된 모든 이미지 태그가 Viewport에 위치하게 되어 observer가 intersect 핸들러를 모든 이미지 태그에 대해 실행하게 되고 결국 이미지 지연 로딩을 통한 자원 절약을 실현할 수 없게 된다. 이런 현상을 방지하기 위해서는 이미지를 감싸는 부모 요소 혹은 이미지 태그에 너비 혹은 높이에 대한 지정 스타일을 부여한 후(beforeLoad단계) 이미지가 로드 완료 되었을 때(afterLoad단계) 요구되는 스타일로 재조정 하는 방법이 있다.

## Plugin Options
| Option                  | Type     | Default | Description
| ---------------------- | -------- |-------- |---------------
| root | HTMLElement | Null(Viewport) | 관찰 대상 영역
| rootMargin | String | 0px | 관찰 대상 영역 가장자리 여백
| threshold | Number | 0 | 옵저버가 실행되기 위한 타겟의 가시율 (0.0 ~ 1.0)

## Directive Parameters
| Parameter                  | Type     | Default | Description
| ---------------------- | -------- |-------- |---------------
| src | String | (required) | 실제 이미지의 소스
| beforeLoad | Function | defaultBeforeLoad | 지연 로딩 이전에 각각의 요소에 실행할 커스텀 정의 함수.
| afterLoad | Function | defaultAfterLoad | 지연 로딩 이후에 각각의 요소에 실행할 커스텀 정의 함수.

## Hooking Functions
`beforeLoad`
> 지연 로딩 이전에 실행시킬 커스텀 정의 함수를 작성하여 디렉티브의 파라미터로 전달할 수 있습니다. 목적은 초기 페이지 렌더링시 너비 혹은 높이 지정값이 없음으로 인해 모든 이미지 요소를 옵저버가 지정한 관찰 대상 영역과 교차상태로 인식하는 것을 회피하기 위해 최소 높이를 지정해주는 함수로써 이용 될 수 있으며 이미지가 렌더링 되기 이전의 UI를 표시하기 위한 DOM API 로직을 포함하는 함수가 될 수 있을 것입니다.

`afterLoad`
> 지연 로딩 이후에 실행시킬 커스텀 정의 함수를 작성하여 디렉티브의 파라미터로 전달할 수 있습니다. 목적은 이미지가 온전히 로드되고 난 후 전체 페이지의 레이아웃과 요구사항에 맞게 이미지의 해상도를 조정하거나 렌더링 이전의 UI를 제거하기 위한 함수로 이용 될 수 있을 것입니다.

## Patch Notes
`v1.0.2`
- package.json 수정