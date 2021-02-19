---
# Memoization
---

## 정의

반복되는 계산을 줄이기 위해 결과를 저장해 두고 사용하는 기법

Dynamic Programming의 핵심

---

## 예시

## 피보나치 수열 계산에서의 Memoization

```cpp
long long fibarr[41] = {0, 1, };

long long fib(int num) {
    if (num == 0) {
        return 0;
    }
    else if (num == 1) {
        return 1;
    }
    else if (fibarr[num] == 0) {
        fibarr[num] = fib(num-1) + fib(num-2);
    }
    return fibarr[num];
}
```

fib(n) = fib(n-1) + fib(n-2) 이므로 중복되는 계산을 없애기 위해 배열에 값을 저장하고 사용함

---

## 조합(Combination) 계산에서의 Memoization

```cpp
int arr[31][31] = { 0 };

int comb(int n, int r) {
	if (n == r || r == 0) return 1;
	if (arr[n][r] == 0) {
		arr[n][r] = comb(n-1, r-1) + comb(n-1, r);
	}
	return arr[n][r];
}
```

nCr = n-1Cr-1 + n-1Cr 임을 이용해 조합을 계산

이때 중복되는 계산을 줄이기 위해 배열에 값을 저장하고 사용함