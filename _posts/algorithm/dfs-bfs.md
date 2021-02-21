---
# DFS와 BFS
---

## DFS

`스택`을 이용해도 되지만 재귀를 이용하면 간단하게 구현가능.

```cpp
void dfs(int num) {
	cout << num << ' ';
	visited[num] = true;
	for (int i = 1; i <= n; i++) {
		if (!visited[i] && graph[num][i]) {
			dfs(i);
		}
	}
}
```

---

## BFS

`큐`를 이용해 구현가능.

시작점을 Enqueue 한 뒤 큐가 빌 때까지 조건에 맞는 요소를 Enqueue하여 탐색한다.

```cpp
void bfs(int num) {
	visited[num] = true;
	q.push(num);

	while (!q.empty()) {
		int p = q.front();
		q.pop();
		cout << p << ' ';

		for (int i = 1; i <= n; i++) {
			if (!visited[i] && graph[p][i]) {
				q.push(i);
				visited[i] = true;
			}
		}
	}
}
```

---

## 백준 1260: DFS와 BFS

```cpp
#include <iostream>
#include <queue>
#include <cstring>
using namespace std;

int n, m, v;
bool graph[1001][1001];
bool visited[1001] = { false };
queue<int> q;

void input() {
	int a, b;
	cin >> n >> m >> v;
	for (int i = 0; i < m; i++) {
		cin >> a >> b;
		graph[a][b] = true;
		graph[b][a] = true;
	}
}

void dfs(int num) {
	cout << num << ' ';
	visited[num] = true;
	for (int i = 1; i <= n; i++) {
		if (!visited[i] && graph[num][i]) {
			dfs(i);
		}
	}
}

void bfs(int num) {
	visited[num] = true;
	q.push(num);

	while (!q.empty()) {
		int p = q.front();
		q.pop();
		cout << p << ' ';

		for (int i = 1; i <= n; i++) {
			if (!visited[i] && graph[p][i]) {
				q.push(i);
				visited[i] = true;
			}
		}
	}
}

int main() {
	input();

	dfs(v);
	cout << '\n';
	memset(visited, false, sizeof(visited));

	bfs(v);
	cout << '\n';

	return 0;
}
```

---
### tags: #tags.graph, #tags.search