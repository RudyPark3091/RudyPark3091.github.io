---
# fill 함수
---

2차원배열을 같은값으로 초기화하기

```cpp
...
int arr[50][50];
fill(&arr[0][0], &arr[49][50], 10);
...
```

첫번째 인자는 배열의 첫번째 원소 주소, 두번째 인자는 배열의 마지막원소 + 1한 주소, 세번째 인자는 채워넣을 값