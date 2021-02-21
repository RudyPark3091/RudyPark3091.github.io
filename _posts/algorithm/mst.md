---
# MST: 최소 신장 트리
---

## 정의

하나의 그래프가 있을 때 모든 노드를 포함하면서 사이클이 존재하지 않는 부분 그래프

n개의 정점을 가질 때 n-1개의 간선으로 연결되어야 함

사용된 간선들의 가중치 합이 최소가 되는 신장 트리

---

# 크루스칼 알고리즘

대표적인 mst 알고리즘

간선의 가중치가 작은 것부터 연산 → 그리디 알고리즘의 일종

## Logic

1. 간선 데이터를 비용에 따라 오름차순으로 정렬
2. 간선을 하나씩 확인하며 현재의 간선이 사이클을 발생시키는지 확인

    2-1. 사이클이 발생하면 mst에 포함 X

    2-2. 사이클이 발생하지 않으면 mst에 포함

    **사이클 발생은 `union-find 알고리즘`으로 탐지 가능**

3. 모든 간선에 대해 2의 과정을 반복

---

## 예시

간선정보를 입력받아 진행

```cpp
#include <iostream>
#include <vector>
#include <tuple>
#include <algorithm>
using namespace std;

vector<int> parent(7);
vector<tuple<int, int, int>> edges = {
	{0, 1, 29}, {0, 4, 75},
	{1, 2, 35}, {1, 5, 34},
	{2, 3, 7},
	{3, 5, 23}, {3, 6, 13},
	{4, 5, 53},
	{5, 6, 25},
};

int find_parent(vector<int>& _parent, int x) {
	if (_parent[x] != x) _parent[x] = find_parent(_parent, _parent[x]);
	return _parent[x];
}

void _union(vector<int>& _parent, int a, int b) {
	a = find_parent(_parent, a);
	b = find_parent(_parent, b);
	if (a > b) _parent[a] = b;
	else _parent[b] = a;
};

bool cmp(tuple<int, int, int> a, tuple<int, int, int> b) {
	return get<2>(a) < get<2>(b);
}

int main() {
	int cost_sum = 0;

	for (int i = 0; i < 7; i++) {
		parent[i] = i;
	}
	sort(edges.begin(), edges.end(), cmp);

	for (auto edge : edges) {
		int a = get<0>(edge);
		int b = get<1>(edge);
		int cost = get<2>(edge);

		// 해당 간선에 대해 양 끝단의 부모 노드가 동일하지
		// 않으면 union 연산 수행
		if (find_parent(parent, a) != find_parent(parent, b)) {
			_union(parent, a, b);
			cout << "add edge between vertex " << a+1
				<< " and " << b+1 << endl;
			cost_sum += cost;
		}
	}
	cout << "cost sum for building MST: " << cost_sum << endl;
	return 0;
}
```

---

## 시간 복잡도

크루스칼 알고리즘 내에서 가장 오래 걸리는 작업이 정렬이기 때문에

`O(ElogE)` 의 시간복잡도를 가짐

---

## 예제

### 백준 16398: 행성 연결

크루스칼 알고리즘을 이용해 최소 신장 트리를 구성하기 위해 필요한 최소 비용을 구하는 문제

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <tuple>
using namespace std;

int n;
int e = 0;
vector<tuple<int, int, int>> edges;
vector<int> parent(1001);

void input() {
	int x;
	cin >> n;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			cin >> x;
			if (j > i) {
				edges.push_back({i, j, x});
				e++;
			}
		}
	}
}

int find_parent(int x) {
	if (parent[x] != x) parent[x] = find_parent(parent[x]);
	return parent[x];
}

void _union(int a, int b) {
	a = find_parent(a);
	b = find_parent(b);
	if (a > b) parent[a] = b;
	else parent[b] = a;
}

bool cmp(tuple<int, int, int> a, tuple<int, int, int> b) {
	return get<2>(a) < get<2>(b);
}

void solve() {
	long long res = 0;
	sort(edges.begin(), edges.end(), cmp);
	for (int i = 0; i < e; i++) {
		auto edge = edges[i];
		int a = get<0>(edge);
		int b = get<1>(edge);
		long long cost = get<2>(edge);

		if (find_parent(a) != find_parent(b)) {
			_union(a, b);
			res += cost;
		}
	}
	cout << res << '\n';
}

int main() {
	cin.tie(NULL);
	ios_base::sync_with_stdio(false);

	input();
	for (int i = 0; i < n; i++) {
		parent[i] = i;
	}
	solve();
	return 0;
}
```

---
### tags: #tag1, #tag2