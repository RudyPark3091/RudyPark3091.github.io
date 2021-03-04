---
# 자바스크립트 객체 - bind 와 this
 
###### 초안 작성일: 2021-03-04
---

## Preface

객체지향 패러다임을 가지는 프로그래밍 언어는 클래스 문법을 지원한다

자바스크립트 역시 ES6에서 클래스 문법이 추가되었는데, 태생이 `프로토타입 기반 언어`인지라 조금 다른 부분이 있다

정말 까도 까도 새로운 모습이다

---

## Prototype

프로토타입에 관한 자세한 사항은 여기선 언급하지 않을 생각이다

자바스크립트에서 `객체`라고 불리는 것들은 모두 `프로토타입 객체`를 가져 상속받거나 상속하여 `프로토타입 체인`을 구성한다

자바스크립트의 모든 함수는 constructor를 가지는 `Function` 객체이다

이는 `(function(...){...}).constructor === Function` 이 참을 반환하는 것에서 알 수 있다

따라서 모든 함수는 `Function` 에서 상속받은 메소드들을 사용할 수 있다

이들 중 `bind()` , `apply()` , `call()` 에 대해 정리해보았다

---

## this

일반적으로 `this`는 생성된 자신의 인스턴스를 가리키는 포인터를 의미한다

자바스크립트에서도 이는 동일하게 작용한다

``` javascript
class Foo {
  constructor() {
    console.log(this);
  }
}

const foo = new Foo();

// 출력:
// Foo {}
```

위 코드는 클래스 Foo의 생성자에서 `this`를 호출하여 자기 자신을 출력한다

`this`는 생성된 인스턴스를 가리키므로 여러 인스턴스를 생성한다면 출력 결과 역시 다르게 나올것이라 예상할 수 있다

``` javascript
class Foo {
  constructor(num) {
    this.bar = num;
    console.log(this);
  }
}

const foo = new Foo(1);
const bar = new Foo(2);

// 출력:
// Foo {bar: 1}
// Foo {bar: 2}
```

다음 케이스를 보자

``` javascript
class ButtonWrapper {
  constructor(target) {
    this.label = document.createElement("span");
    this.label.innerText = "not clicked!";

    this.button = document.createElement("button");
    this.button.addEventListener("click", this.handleClick);
    this.button.innerText = "click me";

    target.appendChild(this.button);
    target.appendChild(this.label);
  }

  handleClick(e) {
    this.label.innerText = "clicked!";
  }
}

const buttonWrapper = new ButtonWrapper(document.body);
```

document.body에 라벨과 버튼을 추가하고, 버튼을 누르면 라벨의 텍스트를 변경하는 의도를 가지고 작성된 코드이다

그러나 이대로 실행하게 되면 에러가 발생한다

```
Uncaught TypeError: Cannot set property 'innerText' of undefined at HTMLButtonElement.handleClick
```

이는 `this`가 가리키는 대상에 착오가 생겨 발생한 문제이다

`handleClick` 메소드의 내용에 `console.log(this)`를 넣어 출력해보면 원인을 알 수 있다

`this.label` 의 내용을 변경하기 위해 썼던 `this` 는 사실 `ButtonWrapper` 객체가 아니라 `button` 을 가리키고 있다

간단한 조치로 이를 해결할 수 있다

---

## bind()

`Function.prototype.bind()` 메소드는 `this` 키워드가 가리키는 객체를 지정한 새로운 함수를 반환한다

첫번째 인자로는 `this` 가 가리킬 객체를, 나머지 인자로는 함수에 전달할 인자를 전달한다

위 `ButtonWrapper` 예시에서,

``` javascript
class ButtonWrapper {
  constructor(target) {
    ...
    this.handleClick = this.handleClick.bind(this);
    ...
  }

  ...
}

...
```

`this.button` 에 이벤트 리스너를 등록하기 전 위의 한 줄만 추가해주면 정상적으로 작동한다

`handleClick` 메소드의 `this` 키워드를 클래스 생성자 범위의 `this`, 즉 `ButtonWrapper` 인스턴스로 바인딩한 함수를 클래스의 `handleClick` 메소드에 덮어썼다

따라서 버튼을 클릭할 시에 이벤트 핸들러 함수는 `this` 를 `ButtonWrapper` 인스턴스로 인식할 것이고 의도한대로 작동할 것이다

## apply() & call()

이와 비슷한 맥락에서 `Function.prototype.apply()` 와 `Function.prototype.call()` 메소드가 있다

둘은 거의 동일하지만 `apply()` 는 함수 실행에 사용될 인자들을 배열 형식으로 받고, `call()` 는 인자들을 개별적으로 받는다는 점이 다르다

`bind()` 와 같이 이 둘은 대상 함수 내부의 `this` 키워드의 대상을 지정하는 역할을 한다

``` javascript
function thisIs() {
  console.log(`this is ${this}`);
}

thisIs();
```

위 코드를 실행하면 콘솔에는 전역 객체 `window` 가 출력될 것이다

함수나 클래스 내부에서 선언된 것이 아니라면 `this` 는 `window` 를 가리키기 때문이다

``` javascript
const obj = { a: 'a', b: 'b' };

function thisIs() {
  console.log(`this is ${this}`);
}

thisIs.call(obj);
```

위 코드를 실행하면 `this` 자리에는 `obj` 가 출력된다

---
### tags: #javascript