---
title: "cookie parser module with express"
date: 2020-11-13 17:58
categories: nodejs
---
## C: Cookie의 생성

쿠키를 다루기 위해 cookie-parser 모듈 설치가 필요하다.  
`npm install cookie-parser`  
먼저 app에서 cookie-parser를 사용한다는 것을 알려야 한다.

```javascript
const cookieParser = require("cookie-parser");
...
app.use(cookieParser());
...
```

쿠키를 생성하는 간단한 미들웨어는 app 또는 router에서

```javascript
router.use('/', (req, res, next) => {
  res.cookie('cookieName', 'choco', { options });
  next();
});
```

와 같이 작성해 만들 수 있다.  
options에는  
maxAge  
expires  
path  
domain  
secure  
httpOnly  
signed  
등의 값이 존재한다.

## R: Cookie 읽기

읽는것은 간단하다.  
미들웨어의 req.cookies를 호출하면 cookie name 별 value 를 반환받을 수 있다.

```javascript
app.get('/', (req, res, next) => {
  const firstCookie = req.cookies.cookieName;
  console.log(firstCookie);
});
```

## U: Cookie 갱신하기

Cookie를 갱신하는 것 역시 쿠키를 만드는것과 마찬가지로 `res.cookie`를 사용한다.

## D: Cookie 삭제하기

Cookie를 삭제하는 것은 `res.clearCookie` 함수를 이용한다.

```javascript
router.use('/', (req, res, next) => {
  res.clearCookie('cookieName');
});
```

만약 cookie 를 생성할 때 path를 지정했다면 parameter에 해당하는 path를 추가로 전달해야 한다.

```javascript
router.use('/', (req, res, next) => {
  res.clearCookie('cookieName', {
    path: '/user'
  });
});
```
