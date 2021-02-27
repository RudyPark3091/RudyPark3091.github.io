---
# Join
---

## Preface

데이터베이스를 사용하다보면 여러 데이터베이스에서 동시에 데이터를 가져와야 할 때가 있다

이때 사용하는 것이 `JOIN`이다

`JOIN`을 사용하면 지정한 조건을 기준으로 서로 다른 테이블의 데이터를 합친 테이블로 필요한 작업을 할 수 있다

`JOIN`에는 `LEFT JOIN, RIGHT JOIN, INNER JOIN, OUTER JOIN`등 여러 바리에이션이 존재한다

예시를 위해 간단한 샘플 데이터를 정의해보았다 (데이터출처: [jsonplaceholder.typicode.com/todos](http://jsonplaceholder.typicode.com/todos))

```sql
TABLE TODOS:
USER_ID    TITLE                 COMPLETED
---------------------------------------------
1         "delectus aut autem"   false
2         "quis ut nam facilis"  false
1         "fugiat veniam minus"  false
3         "laboriosam mollitia"  true
3         "qui ullam ratione"    false
4         "illo expedita"        true
5         "quo adipisci enim"    false

TABLE USERS:
ID   NAME                USERNAME
---------------------------------------
1    "Leanne Graham"     "Bret"
2    "Ervin Howell"      "Antonette"
3    "Clementine Bauch"  "Samantha"
4    "Patricia Lebsack"  "Karinanne"
5    "Chelsey Dietrich"  "Kamren"
```

---

## INNER JOIN

기본적으로 `JOIN`은 `INNER JOIN`을 의미한다

`INNER JOIN`은 테이블 A와 B의 교집합을 의미한다

```sql
SELECT USERS.ID, USERS.NAME, TODOS.TITLE
FROM USERS JOIN TODOS
ON USERS.ID = TODOS.USER_ID;
```

위 쿼리는 `USERS`테이블의 `ID` 칼럼과 `TODOS`테이블의 `USER_ID` 칼럼을 기준으로 작성한 데이터들을 불러온다

단순 교집합 연산이므로 한 행에 `ID`, `NAME`, `TITLE` 속성이 합쳐져서 출력된다

```sql
+------+------------------+---------------------+
| ID   | NAME             | TITLE               |
+------+------------------+---------------------+
|    1 | Leanne Graham    | delectus aut autem  |
|    2 | Ervin Howell     | quis ut nam facilis |
|    1 | Leanne Graham    | fugiat veniam minus |
|    3 | Clementine Bauch | laboriosam mollitia |
|    3 | Clementine Bauch | qui ullam ratione   |
|    4 | Patricia Lebsack | illo expedita       |
+------+------------------+---------------------+
```

---

## OUTER JOIN

`OUTER JOIN`은 `INNER JOIN`에서처럼 지정한 조건에 부합하지 않는 데이터까지 합쳐서 출력하는 JOIN이다

후술할 `LEFT JOIN`, `RIGHT JOIN`이 분류상 `OUTER JOIN`에 해당한다

---

## LEFT JOIN

`LEFT JOIN`은 테이블 A와 B에서 테이블 A를 기준으로 테이블 B를 합쳐서 출력한다

```sql
SELECT USERS.ID, USERS.NAME, TODOS.TITLE
FROM USERS LEFT JOIN TODOS
ON USERS.ID = TODOS.USER_ID;
```

`INNER JOIN`의 쿼리와 다른 점은 `JOIN`이 `LEFT JOIN`으로 바뀐 것 뿐이다

```sql
+------+------------------+---------------------+
| ID   | NAME             | TITLE               |
+------+------------------+---------------------+
|    1 | Leanne Graham    | fugiat veniam minus |
|    1 | Leanne Graham    | delectus aut autem  |
|    2 | Ervin Howell     | quis ut nam facilis |
|    3 | Clementine Bauch | qui ullam ratione   |
|    3 | Clementine Bauch | laboriosam mollitia |
|    4 | Patricia Lebsack | illo expedita       |
|    5 | Chelsey Dietrich | NULL                |
+------+------------------+---------------------+
```

결과는 약간의 차이가 존재한다

`A LEFT JOIN B`에서 테이블 A는 테이블 USERS에 해당한다

`LEFT JOIN`은 테이블 A의 내용은 무조건 출력하는데, 조건에 해당하는 테이블 B의 데이터가 없다면 NULL로 표시한다

---

## RIGHT JOIN

`LEFT JOIN`과 비슷하지만 방향은 반대이다

```sql
SELECT USERS.ID, USERS.NAME, TODOS.TITLE
FROM USERS RIGHT JOIN TODOS
ON USERS.ID = TODOS.USER_ID;
```

`A RIGHT JOIN B`는 테이블 B의 내용을 출력하고, 조건에 해당하는 테이블 A의 데이터가 없다면 NULL로 표시한다

```sql
+------+------------------+---------------------+
| ID   | NAME             | TITLE               |
+------+------------------+---------------------+
|    1 | Leanne Graham    | delectus aut autem  |
|    2 | Ervin Howell     | quis ut nam facilis |
|    1 | Leanne Graham    | fugiat veniam minus |
|    3 | Clementine Bauch | laboriosam mollitia |
|    3 | Clementine Bauch | qui ullam ratione   |
|    4 | Patricia Lebsack | illo expedita       |
| NULL | NULL             | quo adipisci enim   |
+------+------------------+---------------------+
```

`USERS.ID` 를 출력하도록 했기 때문에, 마지막 행의 해당 ID의 USER 데이터가 없으므로 ID는 NULL로 출력된다

---

## UNION

`UNION`은 `JOIN`과 비슷하지만 사용자가 정의한 데이터로 가상의 테이블을 구성하게 한다

```sql
SELECT 1 AS NUM
UNION
SELECT 2 AS NUM;

+-----+
| NUM |
+-----+
|   1 |
|   2 |
+-----+
```

이전의 person 테이블과 연동해서 데이터를 출력할 수도 있다

```sql
SELECT age FROM person
UNION
SELECT 50 AS age;

+------+
| AGE  |
+------+
|   10 |
|   20 |
|   30 |
|   40 |
|   50 |
|   15 |
|   50 |
+------+
```
