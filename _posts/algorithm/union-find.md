---
# Union find 알고리즘
---

## 정의

서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조

트리를 이용해 표현

## Logic

1. union 연산(합집합) 서로 연결된 두 노드 A,B를 확인

    1-1. A와 B의 루트 노드 A', B'를 찾음

    1-2. A'를 B'의 부모 노드로 설정 (B'가 A'를 가리킴)

2. 모든 union 연산을 처리할때까지 1을 반복

---

## 예시

집합 {1, 2, 3, 4, 5, 6} 에 대해

union 연산

`union (1, 4)`, `union (2, 3)`, `union (2, 4)`, `union (5, 6)` 이 주어짐

이 연산의 결과들로 어떤 형태의 부분집합이 형성되나?

보통 트리 구조에서 번호가 작은 노드가 부모 노드가 되고, 큰 노드가 자식 노드가 됨

``` cpp
#include <iostream>
#include <vector>
using namespace std;

// 정점 6, 간선 4개의 트리
int v = 6, e = 4;
// zero-based indexing
vector<int> parent(6);
int union_ops[4][2] = {
	{1, 4},
	{2, 3},
	{2, 4},
	{5, 6},
};

int find_parent(int x) {
	if (parent[x] != x) return find_parent(parent[x]);
	return x;
}

void _union(int a, int b) {
	a = find_parent(a);
	b = find_parent(b);
	if (a > b) parent[a] = b;
	else parent[b] = a;
}

int main() {
	// 부모노드를 자기 자신으로 미리 초기화
	for (int i = 0; i < 6; i++) {
		parent[i] = i;
	}

	// 주어진 union 연산 수행
	for (auto op : union_ops) {
		_union(op[0] - 1, op[1] - 1);
	}

	// 연산 결과 출력
	cout << "-- result --" << '\n';
	for (int i = 0; i < parent.size(); i++) {
		cout << "vertex " << i+1 << "'s union: " << find_parent(i)+1 << '\n';
	}
	return 0;
}
```

출력:

— result —  
vertex 1's union: 1  
vertex 2's union: 1  
vertex 3's union: 1  
vertex 4's union: 1  
vertex 5's union: 5  
vertex 6's union: 5  

---

## 경로 압축 최적화

`find_parent` 함수는 하나씩 부모 노드를 찾아감

최악의 경우 모든 노드를 다 확인하여 O(V)의 시간 복잡도를 가짐

`경로 압축 최적화`는 `find_parent` 함수를 재귀적으로 호출해 부모 테이블을 갱신함

``` cpp
int find_parent(int x) {
	if (parent[x] != x) parent[x] = find_parent(parent[x]);
	return parent[x];
}
```

이를 적용하지 않은 위 코드와 비교했을 때 다른 점

3번 vertex의 parent 테이블 값은 1 (정점 인덱스 2) 이므로 3 → 2 → 1 의 포함 관계를 가짐

아래 코드에선 3번이 직접 1번을 부모로 가져 parent 테이블 값 역시 0이지만,

위 코드에선 3번이 2번을 거쳐 1번을 부모로 가지기 때문에 parent 테이블 값은 1임

---

# Cycle Detection

무방향 그래프 상에서 Cycle을 탐지하는 방법으로 union-find 연산을 사용할 수 있음

1. 간선을 하나씩 확인하며 두 노드의 루트 노드를 확인

    1-1. 루트 노드가 다르면 두 노드를 union

    1-2. 루트 노드가 같다면 Cycle 발생

2. 1번 과정을 그래프의 모든 간선에 대해 반복

## 예시

그래프의 정점: 3개, 간선 3개

간선 연결상태:

1 & 2  
2 & 3  
3 & 1  

``` cpp
#include <vector>
#include <string>
using namespace std;

// 정점 3개, 간선 3개의 cyclic 무방향 그래프
// 원소들은 각각 edge 를 나타냄
// {0, 1} -> vertex 0 & 1 사이에 edge 가 존재함
vector<pair<int, int>> graph = {
	{1, 2}, {0, 2}, {0, 1}
};
vector<int> parent_cycle(3);

int find_parent_cycle(vector<int> &_parent, int x) {
	if (_parent[x] != x) _parent[x] = find_parent_cycle(_parent, _parent[x]);
	return _parent[x];
}

void _union_cycle(vector<int> &_parent, int a, int b) {
	a = find_parent_cycle(_parent, a);
	b = find_parent_cycle(_parent, b);
	if (a > b) _parent[a] = b;
	else _parent[b] = a;
}

string detect_cycle(vector<int> &_parent, vector<pair<int, int>> &_graph) {
	bool cyclic = false;

	for (pair<int, int> edge : _graph) {
		int a = find_parent_cycle(_parent, edge.first);
		int b = find_parent_cycle(_parent, edge.second);
		if (a == b) {
			cyclic = true;
			break;
		} else {
			_union_cycle(parent_cycle, a, b);
		}
	}

	return cyclic ? "Detected" : "No Cycles";
}

int main() {
	// cycle detection
	cout << "Cycle Detection: ";
	for (int i = 0; i < parent_cycle.size(); i++) {
		parent_cycle[i] = i;
	}
	cout << detect_cycle(parent_cycle, graph) << endl;
	return 0;
}
```

출력:

Cycle Detection: Detected

---
### tags: #tag1, #tag2