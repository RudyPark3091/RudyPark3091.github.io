---
# SELECT 문
---

## Preface

`SELECT` 문은 테이블의 데이터를 읽어오는 역할로, CRUD의 R을 담당한다

일반적으로 데이터베이스에서 값을 읽어오는 작업이 많은 만큼 중요한 부분을 담당한다

테이블 'my_table'에서 모든 정보를 얻어오기 위해선 `*` 기호를 사용한다

테이블의 특정 칼럼을 조회하기 위해선 아래와 같이 쿼리를 구성한다

```sql
-- 모든 정보 읽기
SELECT * from my_table;

-- my_table 테이블의 field1, field2 칼럼을 읽기
SELECT field1, field2 from my_table;
```

---

## WHERE

검색에 조건을 둬야 할 때엔 `WHERE` 키워드를 사용한다

보통 조건절에는 비교 연산자를 사용하게 될 것이다

ex) person 테이블에서 age 가 20 이상인 데이터의 name 필드를 검색하는 쿼리

```sql
SELECT name FROM person WHERE age >= 20;
```

### LIKE

와일드카드 문자(`%`, `_` 등)를 사용해 부분적으로 일치하는 데이터를 찾을때 사용한다

```sql
SELECT * FROM person WHERE name LIKE '김%';
```

위 쿼리는 person 테이블에서 name 속성이 '김'으로 시작하는 데이터의 모든 속성을 출력한다

와일드카드 문자 `%`는 0이상의 길이를 갖는 문자열을 의미한다

위 예시에서 '김%'는 '김' 뒤에 오는 문자가 몇 글자든 상관없이 '김'으로 시작만 하면 조건을 만족하는 것으로 간주한다

같은 맥락에서 '%김%'은 문자열에 '김'이라는 문자가 존재한다면 문자열의 길이에 상관없이 조건을 만족하는 것으로 간주한다

와일드카드 문자 `_`는 문자열 한 글자를 의미한다

```sql
-- '김'으로 시작하는 두 글자 문자열 검색
SELECT * FROM person WHERE name LIKE '김_';

-- '김'으로 시작하는 세 글자 문자열 검색
SELECT * FROM person WHERE name LIKE '김__';
```

위 예시와 같이 `_`는 문자열의 길이를 조건문에 포함시켜야 할 때 사용한다

또한 `NOT`키워드를 이용하여 부정 검색을 할 수도 있다

```sql
-- 이름이 '김'으로 시작하지 않는 데이터 검색
SELECT * FROM person WHERE name NOT LIKE '김%';

-- 이름에 '민'이 포함되지 않는 데이터 검색
SELECT * FROM person WHERE name NOT LIKE '%민%';
```

### 복수 조건 검색

`AND` 또는 `OR` 키워드를 이용해 두개 이상의 조건을 걸어서 검색을 할 수도 있다

```sql
-- 나이가 30세 이상, 40세 미만인 데이터 검색
SELECT * FROM person WHERE age >= 30 AND age < 40;

-- 이름이 '김'으로 시작하고, 나이가 20세 이상인 데이터 검색
SELECT * FROM person WHERE name LIKE '김%' AND age >= 20;

-- 나이가 65세 이상이거나, 20세 미만인 데이터 검색
SELECT * FROM person WHERE age >= 65 OR age < 20;
```

### IN

여러 값들 중에서 일치하는 값이 있는지 검색하기 위한 쿼리는 다음과 같다

```sql
SELECT * FROM my_table
WHERE field1 = 'some value1'
OR field1 = 'some value2'
OR field2 = 'some value3'
OR field3 = 'some value4'; 
```

`OR` 키워드를 여러 개 사용하여 조건문을 구성했다

하지만 이 방식으로 모든 쿼리를 구성하기엔 번거롭고 복잡해 보인다

이는 `IN`키워드로 해결할 수 있다

```sql
SELECT * FROM my_table
WHERE field1 IN(
	'some value1',
	'some value2',
	'some value3',
	'some value4'
);
```

훨씬 깔끔하게 조건문을 구성할 수 있다

### BETWEEN

위 `AND` 키워드의 예시 역시 `BETWEEN`키워드를 사용하여 깔끔하게 쓸 수 있다

```sql
SELECT * FROM person WHERE age >= 20 AND age < 30;

SELECT * FROM person WHERE age BETWEEN 20 AND 29;
```

다만 `BETWEEN A AND B`의 형식에서 B 역시 포함되는 값임을 주의하자

---

## ORDER BY

SELECT문의 검색 결과는 테이블에 저장된 순서대로 출력된다

이를 사용자가 원하는 순서대로 출력하려면 `ORDER BY`키워드를 사용한다

```sql
-- 검색 결과를 나이(age)순 오름차순으로 정렬
-- 정렬 기준(오름, 내림차순)을 명시하지 않을시엔 오름차순으로 정렬됨
SELECT * FROM person ORDER BY age ASC;

-- 검색 결과를 나이순 내림차순으로 정렬
SELECT * FROM person ORDER BY age DESC;

-- 나이가 20 이상인 사람의 데이터를 나이 내림차순으로 정렬
SELECT * FROM person
WHERE age >= 20 ORDER BY age DESC;
```

---

## LIMIT

데이터베이스를 사용하다 보면 "가장 ~~한" 데이터를 읽어와야 할 일이 있다

이를 해결하기 위한 간단한 방법으로 `LIMIT`키워드가 있다

```sql
-- person 테이블에서 가장 age가 큰 값인 데이터 검색
SELECT * FROM person
ORDER BY age DESC
LIMIT 1;

-- person 테이블에서 가장 age가 작은 5개의 데이터 검색
SELECT * FROM person
ORDER BY age
LIMIT 5;

-- person 테이블에서 age가 큰 순으로 5번째부터 8번째 데이터 검색
SELECT * FROM person
ORDER BY age DESC
LIMIT 5, 8;
```

### 예제

프로그래머스 SQL 고득점 kit SELECT 7번

```sql
SELECT NAME FROM ANIMAL_INS
ORDER BY DATETIME LIMIT 1;
```

또는 서브쿼리를 사용할 수도 있다

```sql
SELECT NAME FROM ANIMAL_INS
WHERE DATETIME = (
    SELECT min(DATETIME) FROM ANIMAL_INS
)
```

---

## COUNT

`COUNT`키워드는 해당 행의 숫자가 필요할 때 사용한다

```sql
SELECT COUNT(*) FROM person;
```

위 쿼리는 person 테이블의 데이터의 수를 출력한다

이때 `COUNT` 안에 특정 칼럼의 이름을 넣게 되면 해당 속성이 NULL이 아닌 데이터의 수를 반환한다

또한 데이터의 값이 같더라도 다른 것으로 취급한다

같은 데이터 값은 한번만 세고 싶다면 `DISTINCT` 키워드를 붙여서 사용한다

```sql
table my_table
A   B   C
---------
1   1   1
2   2   3
3   2
4   3   2
5   4   4

-- my_table이 위와 같은 데이터를 가질때
SELECT COUNT(*) FROM my_table  -- (a)
SELECT COUNT(A) FROM my_table  -- (b)
SELECT COUNT(B) FROM my_table  -- (c)
SELECT COUNT(DISTINCT B) FROM my_table  -- (d)
SELECT COUNT(C) FROM my_table  -- (e)
```

출력결과)

(a): 5

(b): 5

(c): 5

(d): 4

(e): 4

---

## IFNULL

`IFNULL`함수는 대상 칼럼의 값이 NULL일 때 대체할 표현을 지정해주기 위해 사용한다

IFNULL(대상 칼럼명, 대체 표현) 의 형식으로 사용한다

```sql
-- name 데이터가 NULL인 데이터의 name을 noname으로 출력
SELECT IFNULL(name, 'noname')
FROM person;
```

`IFNULL`은 `IF`와 `IS NULL`으로 대체할 수 있다

### IF

`IF`함수는 첫번째 인자의 조건식이 참이라면 두번째 인자를, 거짓이라면 세번째 인자를 반환한다

이를 이용하여 다음과 같이 구성하면 위 쿼리와 같은 결과를 출력한다

```sql
SELECT IF(IS NULL(name), 'noname', name)
FROM person;
```