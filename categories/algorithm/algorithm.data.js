// {
//   title: String,
//   url: String,
//   icon: String,
//   tags: [String],
//   id: Number,
// }

import tags from "./tags.data.js";

export const data = [
  {
    "title": "sample post",
    "url": "/_posts/2020-08-26-first-post.md",
    "icon": "/icons/document.svg",
    "tags": [{name: "test", color:"#eeb9f9"}],
    "id": 0,
  },
  {
    "title": "union-find 알고리즘",
    "url": "/_posts/algorithm/union-find.md",
    "icon": "/icons/document.svg",
    "tags": [tags.graph, tags.union],
    "id": 1,
  },
  {
    "title": "Trie 자료구조",
    "url": "/_posts/algorithm/trie.md",
    "icon": "/icons/document.svg",
    "tags": [tags.tree, tags.string, tags.search],
    "id": 2,
  },
  {
    "title": "MST: 최소 신장 트리",
    "url": "/_posts/algorithm/mst.md",
    "icon": "/icons/document.svg",
    "tags": [tags.tree, tags.graph],
    "id": 3,
  },
  {
    "title": "Topology sort: 위상 정렬",
    "url": "/_posts/algorithm/topology-sort.md",
    "icon": "/icons/document.svg",
    "tags": [tags.graph, tags.sort],
    "id": 4,
  },
  {
    "title": "DFS & BFS",
    "url": "/_posts/algorithm/dfs-bfs.md",
    "icon": "/icons/document.svg",
    "tags": [tags.graph, tags.search],
    "id": 5,
  },
  {
    "title": "Memoization",
    "url": "/_posts/algorithm/memoization.md",
    "icon": "/icons/document.svg",
    "tags": [tags.dp],
    "id": 6,
  },
  {
    "title": "sstream in c++",
    "url": "/_posts/algorithm/sstream.md",
    "icon": "/icons/document.svg",
    "tags": [tags.stl, tags.short, tags.string],
    "id": 7,
  },
  {
    "title": "fill 함수",
    "url": "/_posts/algorithm/fill-function.md",
    "icon": "/icons/document.svg",
    "tags": [tags.stl, tags.short],
    "id": 8,
  },
] 