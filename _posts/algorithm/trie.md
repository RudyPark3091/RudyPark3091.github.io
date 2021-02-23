---
# Trie 자료구조
---

## 정의

문자열을 효율적으로 저장하고 탐색하기 위한 트리 자료구조

루트 노드부터 자식 노드까지 따라가면서 생성된 문자열들이 저장됨

각 노드들은 `해당 노드가 종료 노드를 표현하는지`를  나타내는 bool 변수와,

`자손 노드들을 가리키는 포인터들`로 구성됨

효율적인 시간 복잡도를 가지지만, 공간 복잡도는 큼

## 구현

루트 노드로부터 알파벳 크기만큼의 자식 배열을 선언 및 null 값 할당

### 문자열 삽입시

문자열을 이루는 character 각각에 대해 노드를 하나씩 할당

삽입할 문자열의 마지막 character에 이르면 해당 노드의 bool 변수를 true로 set

### 문자열 검색시

문자열을 이루는 character 각각에 대해 children 배열의 index 검사

해당 index의 값이 null이라면 null 반환 → 해당 문자열은 존재하지 않음

해당 index의 값이 있다면 재귀적으로 탐색

검색한 문자열의 마지막 character에 이르면 해당 Trie 노드(혹은 필요한 값)를 반환

---

## 예시

```cpp
#include <iostream>
#include <cstring>
#define ALPHABET_SIZE 26
using namespace std;

struct TrieNode {
	bool is_end;
	struct TrieNode *children[ALPHABET_SIZE];

	TrieNode() : is_end(false) {
		memset(children, 0, ALPHABET_SIZE);
	}

	~TrieNode() {
		for (int i = 0; i < ALPHABET_SIZE; i++) {
			if (children[i]) delete children[i];
		}
	}

	void insert(const char* key) {
		if (*key == '\0') {
			is_end = true;
		} else {
			int idx = *key - 'A';
			if (children[idx] == NULL) {
				children[idx] = new TrieNode();
			}
			children[idx] -> insert(key + 1);
		}
	}

	TrieNode* search(const char* key) {
		if (*key == 0) return this;
		int idx = *key - 'A';
		if (children[idx] == NULL) return NULL;
		return children[idx] -> search(key + 1);
	}
};

int main() {
	TrieNode* t = new TrieNode;
	t -> insert("hi");
	t -> insert("fell");

	TrieNode* result = t -> search("hi");
	if (result) cout << "EXISTS" << endl;
	else cout << "NOT FOUND" << endl;

	TrieNode* result2 = t -> search("hello");
	if (result2) cout << "EXISTS" << endl;
	else cout << "NOT FOUND" << endl;

	TrieNode* result3 = t -> search("ell");
	if (result3) cout << "EXISTS" << endl;
	else cout << "NOT FOUND" << endl;

	delete t;
	return 0;
}
```

출력:

EXISTS  
NOT FOUND  
NOT FOUND  

---

## 한계

위 방법으로 구현한 trie는 접두사만을 검색할 수 있음

이를 보완하기 위해 접미사 trie 를 구현할 수 있지만,

단순하게 구현하면 O(n²)의 시간복잡도를 가지고, 효율적으로 구현하려면 너무 복잡함

---

## 활용

### 2020 카카오 신입 블라인드 채용 1차 테스트 문제 4번

자바스크립트로 변형하여 구현한 코드

```jsx
// 4. 가사 검색

const Node = function () {
	this.isEnd = false;
	this.children = new Map();
	this.cnt = 0;
};

const Trie = function () {
	this.root = new Node();

	this.insert = function (str, tNode = this.root) {
		while (str.length !== 0) {
			tNode.cnt += 1;
			if (!tNode.children.has(str[0])) {
				tNode.children.set(str[0], new Node());
			}
			tNode = tNode.children.get(str[0]);
			str = str.substr(1);
		}
		tNode.isEnd = true;
	};

	this.search = function (str, tNode = this.root) {
		if (str.length === 0) return true;
		if (!tNode.children.has(str[0])) return false;
		return this.search(str.substr(1), tNode.children.get(str[0]));
	};

	this.searchCnt = function (str, tNode = this.root) {
		if (str.length === 0) return tNode.cnt;
		if (!tNode.children.has(str[0])) return 0;
		return this.searchCnt(str.substr(1), tNode.children.get(str[0]));
	};
};

const revString = (str) => {
	const _str = str.split("").reverse().join("");
	return _str;
};

function solution(words, queries) {
	var answer = [];
	const trie = Array.from(new Array(10001), () => new Trie());
	const revTrie = Array.from(new Array(10001), () => new Trie());

	for (const word of words) {
		trie[word.length].insert(word);
		revTrie[word.length].insert(revString(word));
	}

	for (let query of queries) {
		if (query[0] === "?") {
			query = revString(query);
			answer.push(
				revTrie[query.length].searchCnt(query.replace(/\?/g, ""))
			);
		} else {
			answer.push(
				trie[query.length].searchCnt(query.replace(/\?/g, ""))
			);
		}
	}

	return answer;
}

console.log(
	solution(
		["frodo", "front", "frost", "frozen", "frame", "kakao"],
		["fro??", "????o", "fr???", "fro???", "pro?"]
	)
);
```

언어의 한계로 maximum recursion depth 에 도달해 insert 연산을 재귀적으로 구현하지 않고 반복문으로 구현함

Trie 와 Node 를 분리하여 구현함

접미사 검색을 구현하기 위해 words배열의 원소들을 뒤집어 trie에 저장함  
이후 query 문자열을 뒤집어 검색함

---
### tags: #트리, #문자열, #탐색