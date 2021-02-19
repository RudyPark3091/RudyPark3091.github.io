---
sstream in c++
---

## #include <sstream>

C++ 에는 없는 split() 함수를 사용하기 위한 코드

## 예시

### 백준 1541: 잃어버린 괄호

```cpp
#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

string sik;
int res = 0;
bool first = false;
vector<string> arr;

void input() {
  cin >> sik;

  if (sik.at(0) == '-') {
    first = true;
  }

  istringstream st(sik);
  string buf;
  while(getline(st, buf, '-')) {
    arr.push_back(buf);
  }
}

void solve() {
  string buf;

  for (int i = 0; i < arr.size(); i++) {
    istringstream st(arr[i]);
    int sum = 0;

    while (getline(st, buf, '+')) {
      sum += stoi(buf);
    }
    
    if (!first && i == 0) {
      res += sum;
    } else {
      res -= sum;
    }
  }

  cout << res << '\n';
}
  
int main() {
  input();
  solve();

  return 0;
}
```

---

## 형식

string a, b, istringstream strm;

```cpp
// 파싱 대상 문자열
string a;
// 버퍼 역할 문자열
string b;
// 문자열 스트림
// 괄호 안에 대상 문자열을 인자로 전달
istringstream strm(a);

// getline() 함수로 구분자가 나오기 전까지 읽어들임
// getline( 스트림, 버퍼, 구분자 )
while (getline(strm, b, ' ')) {
	// do something
}
```