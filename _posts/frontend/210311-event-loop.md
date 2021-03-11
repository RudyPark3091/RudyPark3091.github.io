---
# 이벤트 루프
  
###### 초안 작성일: 2021-03-11
---

자바스크립트는 흔히 `싱글 스레드`기반 언어라고 함

하지만 실제로 자바스크립트는 여러 작업을 동시에 처리함

이것이 어떻게 가능한것인가?

자바스크립트는 이론적으로 `스택`, `힙`, `큐` 로 이루어진 `동시성 모델`을 가짐

`동시성`이란 DOM의 애니메이션을 보여주며 클릭 이벤트를 처리하는 것 처럼 여러 작업을 동시에 처리하는 것을 의미

`병렬성`과는 다른 의미를 가짐

현대의 자바스크립트 엔진들은 이 모델을 구현하고 최적화함

## 스택

함수 호출로 생성됨

``` javascript
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7)); //returns 42
```

bar 호출시 bar의 인자와 지역변수를 포함하는 첫번째 스택 프레임 생성

bar 내부에서 foo 호출시 foo의 인자외 지역변수를 포함하는 두번째 스택 프레임 생성

foo가 반환할시 가장 상위에 있는 스택 프레임이 pop됨

---

## Heap

객체들이 할당되는 공간

---

## Queue

처리되어야 할 메시지들의 리스트 - `메시지 큐`(또는 `태스크 큐`)를 사용함

메시지 큐에는 이벤트 리스너가 부착된 이벤트가 발생할 때마다 메시지가 추가됨

리스너가 없으면 이벤트는 손실됨

### setTimeout

setTimeout 함수는 두번째 인자로 전달되는 시간 이후에 첫번째 인자로 전달되는 콜백을 실행함

하지만 정확히 지정한 시간 이후에 실행되지 않음

사실 시간 값은 지정한 시간이 흐른 후에 실행하는 것이 아니라 지정한 시간이 흐른 후에 메시지 큐에 푸시될때까지의 시간이기 때문

메시지 큐에 메시지가 있는 경우 다른 메시지가 처리되고 나서 setTimeout 메시지(콜백 함수)가 처리됨

``` javascript
const s = new Date().getSeconds();

setTimeout(function() {
  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500);

while(true) {
  if(new Date().getSeconds() - s >= 2) {
    console.log("Good, looped for 2 seconds");
    break;
  }
}

// 출력결과:
// Ran after 2 seconds
// Good, looped for 2 seconds
```

setTimeout에는 500을 전달했지만 실제로 실행되는건 2초의 시간이 지난 뒤임

``` javascript
(function() {

  console.log('this is the start');

  setTimeout(function cb() {
    console.log('this is a msg from call back');
  });

  console.log('this is just a message');

  setTimeout(function cb1() {
    console.log('this is a msg from call back1');
  }, 0);

  console.log('this is the end');

})();

// 출력결과:
// "this is the start"
// "this is just a message"
// "this is the end"
// note that function return, which is undefined, happens here
// "this is a msg from call back"
// "this is a msg from call back1"
```

비슷하게 위 예제에서 setTimeout의 시간값에 0을 전달해도 먼저 전달된 메시지를 처리하고 나서 실행됨

여기서 먼저 전달된 메시지는 setTimeout 밖에 있는 코드들을 의미

하지만 0을 전달하더라도 이는 '즉시'라는 의미를 가지지 않음

실행 환경별로 타이머의 최소 단위를 정의하기 때문에 실제로는 그 시간이 지나야 메시지 큐에 작업이 추가됨

'즉시' 메시지 큐에 작업을 추가하기 위한 `setImmediate()`라는 함수가 존재하지만 비표준으로 IE10 이상에서만 사용가능함

### Run to Completion

자바스크립트의 함수가 실행되는 방식을 흔히 Run to Completion 이라 말함

하나의 함수가 실행되면 이 함수의 실행이 끝날 때 까지는 다른 작업이 끼어들지 못한다는 의미

---

## 단일 스레드

흔히 자바스크립트는 '단일 스레드'기반 언어라고 칭함

사실 자바스크립트 런타임은 여러 스레드를 사용함

단일 스레드라는 말은 '자바스크립트 엔진이 단일 콜 스택을 사용한다'는 맥락에서 나온 말

이때 런타임 환경과 엔진이 상호작용하기 위해 사용되는 장치가 '이벤트 루프'임

---

## 이벤트 루프

이벤트 루프는 현재 실행중인 작업이 없을 때 (보통 스택이 비워질 때)마다 위에서 설명한 메시지 큐에서 콜백 함수를 꺼내와 실행시키는 역할을 함

모든 비동기 api들은 작업이 완료되면 콜백 함수를 메시지 큐에 추가함

XMLHttpRequest 같은 비동기 요청의 경우, 서버에 요청을 보내고 바로 실행을 마치고 스택에서 제거됨

응답을 받은 이후에 이벤트 루프가 XMLHttpRequest에 등록된 콜백을 실행시킴

즉 XMLHttpRequest와 그 내부에 등록된 콜백은 전혀 다른 맥락에서 실행 되므로 둘의 예외처리를 각각 해줘야함

---

## Promise

Promise 객체 역시 비동기식으로 실행됨

``` javascript
setTimeout(() => {
	console.log("A");
}, 0);

Promise().resolve()
	.then(() => {
		console.log("B");
	})
	.then(() => {
		console.log("C");
	});

// 출력결과:
// B
// C
// A
```

프로미스는 `마이크로 태스크`라는 것을 사용하기 때문에 setTimeout 함수보다 먼저 실행됨

마이크로 태스크는 일반 태스크보다 높은 우선순위를 갖는 태스크

메시지 큐에 대기중인 작업이 있더라도 마이크로 태스크가 먼저 실행됨

프로미스의 then() 함수는 콜백함수를 별도의 마이크로 태스크 큐에 추가하고, 이벤트 루프는 마이크로 태스크 큐가 비었는지 먼저 확인한 후 태스크 큐를 확인함

이때 마이크로 태스크 큐가 비어있다면 태스크 큐의 콜백 함수를 실행하고, 그렇지 않을 경우 마이크로 태스크 큐를 먼저 실행함

마이크로 태스크가 계속해서 실행될 시 일반 태스크인 UI 렌더링 같은 작업에 지연이 생길 수 있으므로 둘의 차이점을 제대로 이해해야 함

ES6에는 프로미스를 위한 `잡 큐` 라는 개념이 추가되었다고 함

또한 `웹 워커` 는 각각이 독립적인 이벤트 루프를 사용하여 `워커 이벤트 루프`라고 칭함

nodejs 에는 '클러스터' 라는 개념도 있음

---
### tags: #javascript, #core