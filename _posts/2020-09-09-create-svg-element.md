---
title: "creating svg element in javascript"
date: 2020-09-09 02:43
categories: html/css
---
자바스크립트로 동적으로 html element 를 만들어서 document 에 붙이는것이 가능하다.  
``` javascript
...
const div = document.createElement("div");
div.innerText = "hello world!";
document.body.append(div);
...
```
위와같이 createElement()는 html element 를 반환한다.  
하지만 svg 태그는 xml 기반이기 때문에 createElement()를 호출하면 우리가 원하는 결과물을 내놓지 않는다.  
이 때 사용할 수 있는 함수가 createElementNS()이다.  
``` javascript
...
document.createElementNS('http://www.w3.org/2000/svg', 'circle');
...
```
자세한 동작원리는 정확히 모르지만 이 방법으로 해야 svg 태그를 조작하여 동적으로 화면을 구성할 수 있다.  
  
reference:  
https://webhint.io/docs/user-guide/hints/hint-create-element-svg/  
https://developer.mozilla.org/ko/docs/Web/API/Document/createElementNS  
