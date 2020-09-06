---
title: "python operator module"
date: 2020-09-05 22:06:28 -0400
categories: python
---
파이썬의 내장모듈(?) 중 operator 라는 것이 있다. 이를 이용하면 '+', '-' 처럼 String 형식의 연산자를 연산자로 바꾸는것이 가능하다.  
``` python
import operator
ops = {
    '+' : operator.add,
    '-' : operator.sub,
    '*' : operator.mul,
    '/' : operator.truediv,  # use operator.div for Python 2
    '%' : operator.mod,
    '^' : operator.xor,
}
print ops["+"](1,1) # prints 2
...
```
이쯤되면 파이썬은 PS를 위해 만들어진 언어라고 할 수 있을 정도로 간편하다.

reference:  
https://stackoverflow.com/questions/1740726/turn-string-into-operator
