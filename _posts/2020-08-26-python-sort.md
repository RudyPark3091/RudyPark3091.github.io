---
title: "Python Sort"
date: "2020-08-26 19:15:00 -0400"
categories: python
---
## sorted함수
sorted 함수는 key의 조건으로 리스트를 반환한다.
```
sorted_list = sorted({listname}, key={key}, reverse={true/false})
```

두개의 기준으로 정렬을 하려면 key를 lambda형식으로 전달한다.
```
sorted_list = sorted({listname}, key=lambda {listname}: ({listname}[0], {listname}[1]))
```

이때 리스트의 값 뿐만 아니라 항목의 길이로도 정렬가능하다.
ex) 백준 1181
```
...
sorted_list = sorted_list = sorted(set_list, key=lambda set_list: (len(set_list), set_list))
...
```