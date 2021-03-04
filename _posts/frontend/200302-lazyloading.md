---
# Lazy Loading

###### 초안 작성일: 2021-03-02
---

## Preface

사용자가 웹 페이지에 접속하게 되면 필요한 리소스를 다운로드 받게 된다

그 중에서 이미지는 가장 많이, 또 흔히 보여지는 요소들 중 하나이다

하지만 이미지는 일반적인 텍스트보다 훨씬 큰 용량을 차지하고, 페이지의 모든 이미지를 한번에 다운로드 받는 것은 성능에 큰 영향을 미친다

이를 방지하기 위해 사용자가 이미지를 보게 되는 시점에 이미지를 요청하게 되면 리소스의 낭비를 줄일 수 있을 것이다

---

## IntersectionObserver 객체

과거에는 `element.getBoundingClientRect()` 함수를 이용해 lazy loading을 구현했다

`getBoundingClientRect` 함수는 element의 크기와 위치 값을 가지는 `DOMRect` 객체를 반환한다

이 값들로 현재 뷰포트의 width, height와 element의 위치정보로 element가 뷰포트 안에 있는지를 파악할 수 있다

하지만 이 방법을 사용하면 여러 이벤트 핸들러와 루프가 얽혀 메인 스레드에서 실행되기 때문에 성능 하락을 일으킬 수 있다

element가 뷰포트 안에 있는지 확인하기 위해 뷰포트가 변화할때마다 반복적으로 함수를 호출해 브라우저가 느려지게 하는 원인이 된다

이를 해결하기 위해 `IntersectionObserver` 객체가 등장했다

`IntersectionObserver`는 대상 element의 영역이 지정한 root element(기본값은 브라우저의 뷰포트)의 영역과 교차하는 시점에 비동기적으로 이벤트를 발생시킨다

이는 대상 element의 교차를 감시하기 위해 메인 스레드를 사용할 필요가 없게 한다

당연하게도(?) IE 에선 지원되지 않는다

사용법은 다음과 같다

### 선언

`IntersectionObserver`객체의 인자는 콜백 함수, 생성 옵션 두 가지로 구성된다

``` javascript
const options = {
  ...
}

const callback = (entries, observer) => {
  ...
}

const io = new IntersectionObserver(callback, options);
```

이때 callback함수는 두 가지 인자를 전달받는다

첫번째는 `entries` 배열로, `IntersectionObserverEntry`객체의 배열이다

`IntersectionObserverEntry`객체는 `IntersectionObserver` 객체의 '관찰대상'이 되는 엘리먼트를 표현하는데, `target`, `isIntersecting`, `rootBounds` 등의 프로퍼티를 통해 Intersect 시점과 대상 엘리먼트에 대한 정보 등을 알수 있다

두번째는 `observer` 객체로, `IntersectionObserver` 자신을 가리키는 객체이다

콜백 함수는 대상 엘리먼트가 뷰포트에 들어왔을 때 취할 동작을 정의하는데, 이때 `IntersectionObserver` 자신이 취할 동작 역시 지정 가능하다는 의미이다

### Intersect 시 동작 지정

사용자의 뷰포트에 대상 엘리먼트가 들어왔을 때의 동작을 지정하는 것은 콜백 함수의 역할이라고 하였다

이미지 요청은 img 태그의 `src` 속성에 값이 들어가는 시점에 이루어진다

따라서 img 태그의 `data-src` 속성에 대상 이미지의 주소를 저장해놓고 뷰포트에 이미지가 들어오게 되면 태그의 `src` 속성을 업데이트 해준다 

``` javascript
const callback = (entries, observer) => {
  entries.forEach(entry => {
    // 해당 엘리먼트가 뷰포트에 들어오면
    if (entry.isIntersecting) {
      // 엘리먼트의
      const target = entry.target;
      // data-src 속성을
      const imgSrc = target.dataset.src;
      // src 속성에 대입한다
      target.setAttribute("src", imgSrc);
      // 완료했으면 대상에서 제거
      observer.unobserve(target);
    }
  });
}

// 당연한 얘기지만 두번째 인자 options객체는 생략 가능하다
const inter = new IntersectObserver(callback);
```

위 예시와 같이 대상 엘리먼트가 뷰포트에 들어오면 이미지 요청 작업을 수행하고, `unobserve()` 메소드를 호출해 '관찰'을 종료한다

### Observe 항목 지정

마지막으로 생성자에 첫번째 인자로 전달한 `Observer`가 '관찰'할 엘리먼트를 지정해줘야 한다

이때 `observe()` 메소드를 이용한다

이미지의 lazy loading을 구현하는 것이 목적이므로, 모든 이미지 태그를 '관찰'하도록 한다

``` javascript
const images = document.querySelectorAll("img");
images.forEach(img => inter.observe(img));
```

---

## 예제

위 과정으로 작성한 이미지 lazy loading 예제이다

css로 fade in 효과를 줘 이미지가 로드되는 시점을 명확히 했다

<center><iframe height="544" style="width: 75%;" scrolling="no" title="image lazy loading" src="https://codepen.io/rudypark3091/embed/MWjdXJR?height=544&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/rudypark3091/pen/MWjdXJR'>image lazy loading</a> by RudyPark3091
  (<a href='https://codepen.io/rudypark3091'>@rudypark3091</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe></center>

---

## 무한 스크롤

또한 `IntersectObserver`를 응용하여 무한 스크롤을 구현할 수도 있다

엘리먼트의 마지막 항목이 뷰포트에 들어오게 되면 content를 더 로드하는 방식이다

아래 예제로 설명을 대체한다

<center><iframe height="544" style="width: 75%;" scrolling="no" title="Infinite Scrolling with IntersectionObserver" src="https://codepen.io/rudypark3091/embed/gOLOPrB?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/rudypark3091/pen/gOLOPrB'>Infinite Scrolling with IntersectionObserver</a> by RudyPark3091
  (<a href='https://codepen.io/rudypark3091'>@rudypark3091</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe></center>

---
### tags: #최적화, #livedemo