---
title: using fetchApi in nodejs Environment
date: "2020-09-02 16:16:00 -0400"
categories: nodeJS
---

## fetch api
브라우저단에서 동작하는 자바스크립트 내장함수 중 fetch() 가 있다. 
이 함수는 url을 받아 해당 페이지의 내용을 받아오는 함수이다. 
이 기능은 이전 XMLHttpRequest()나 jQuery의 ajax() 와 일맥상통한다. 

한가지 다른점은 fetch() 는 Promise객체를 반환하는데, http error상태일때에도 reject하지않는다. 
error code가 404이거나 500 일때 ok 상태가 false 인 resolve를 반환한다. 
다만 네트워크 장애나 요청이 완료되지 못한 상태일 때 reject가 반환된다.  
``` javascript
fetch('url')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```
위 코드는 url 의 내용을 json 형식으로 받아와 출력하는 예제이다. 
이때 3라인의 json()을 text()로 바꿔주면 페이지의 html요소를 String 타입으로 받아올수 있다. 
이후 DOMParser를 이용해 html 형식으로 구문분석해준 뒤 필요한 정보를 읽어내는 방식으로 간단하게 크롤러를 만들 수도 있다. 
  
## fetch in nodeJS Environment
클라이언트단에서는 fetch()를 이용해 데이터를 받아올 수 있었다. 
하지만 이를 nodeJS 환경에서 사용하려고 하면 오류가 발생한다. 
이를 해결하기 위해선 추가 dependency가 필요하다.  
[node-fetch]를 추가해 서버단에서 fetch api 기능을 사용할 수 있다.  
``` javascript
const fetch = require("node-fetch");
...
fetch('url').then(response => {...});
...
```
  
물론 브라우저단에서 동작하던 DOMParser 역시 작동하지 않으므로 dependency를 추가해줘야한다.
이때 [여러가지 방법]이 있는데, [jsdom]을 사용하는 방법을 정리해보았다.
``` javascript
const { JSDOM } = require("jsdom");
...
// html 변수 -> html element in String type
const parsedHtml = new JSDOM(html);
const element = new JSDOM(
  parsedHtml.window.document.querySelector( `just like in css selector`).innerHTML
);
...
```
위와 같이 parentElement.window.document.querySelector 을 이용해 원래 하던것처럼 element 를 뽑아낼 수 있다. 
지금까지 정리한 내용으로 간단하게 빌보드 차트 탑100 리스트를 크롤링(이라고 하기도 민망하지만)해오는 api 서버를 디자인해보았다.  
[https://github.com/RudyPark3091/billboardTop100Api]

### p.s
JSDOM 의 경우 fetch response.text() 에서 받아온 html을 한번밖에 파싱하지 못다.  
아마 JSDOM 은 htmlElement 가 아닌 다른 Object Type 을 반환하기 때문일 것이다.

[node-fetch]: https://www.npmjs.com/package/node-fetch
[jsdom]: https://www.npmjs.com/package/jsdom
[여러가지 방법]: https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js/55668667
[https://github.com/RudyPark3091/billboardTop100Api]: https://github.com/RudyPark3091/billboardTop100Api
