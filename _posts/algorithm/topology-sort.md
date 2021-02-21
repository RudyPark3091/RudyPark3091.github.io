---
# Topology sort: 위상 정렬
---

## 정의

**방향 그래프**의 모든 노드를 방향성에 거스르지 않도록 순서대로 나열하는 알고리즘

- 진입 차수: 어떤 노드로 들어오는 간선의 개수

## Logic

1. 진입차수가 0인 노드를 Enqueue
2. 큐가 빌 때까지 아래 과정을 반복

    2-1. 큐에서 원소를 꺼내 해당 노드에서 출발하는 간선을 그래프에서 제거

    2-2. 새롭게 진입차수가 0이 된 노드를 Enqueue

만약 모든 노드를 방문하기 전에 큐가 비면 사이클이 존재한다고 할 수 있음

보통 위상 정렬 문제에선 사이클이 발생하지 않는다고 명시함

위 과정을 수행하는 동안 큐에서 빠져나간 순서대로 노드를 나열하면 그것이 위상 정렬의 수행 결과가 됨

---

## 예시

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// one-based index
vector<int> graph[8] = {
	{},
	{2, 5},
	{3, 6},
	{4},
	{7},
	{6},
	{4},
	{},
};

vector<int> deg = {
	0, 0, 1, 1, 2, 1, 2, 1 
};

void topology_sort(vector<int>* _graph, vector<int> _deg) {
	queue<int> q;
	for (int i = 1; i < _deg.size(); i++) {
		if (_deg[i] == 0) q.push(i);
	}

	cout << "-- result --" << '\n';
	while (!q.empty()) {
		int now = q.front();
		cout << now << ' ';
		q.pop();

		for (int i = 0; i < _graph[now].size(); i++) {
			int node = _graph[now][i];
			_deg[node] -= 1;
			if (_deg[node] == 0)
				q.push(node);
		}
	}
	cout << '\n';
}

int main() {
	topology_sort(graph, deg);
	return 0;
}
```

출력:

— result —

1 2 5 3 6 4 7

---
### tags: #tag1, #tag2