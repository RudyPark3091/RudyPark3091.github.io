---
title: "mysql generals"
date: 2020-10-01 20:26:28 -0400
categories: mysql
---
mysql 쉘 환경에서 connection password를 변경할수 있다.   
mysql 8.0이상 버전에서   
`alter user '계정이름'@'localhost' identified with password mysql_native_password by '변경할비밀번호';`   
를 입력하면 된다. 물론 sudo 권한이 있어야한다.
