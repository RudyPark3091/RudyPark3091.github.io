import Renderer from "../../js/renderer.js";
import Styler from "../../js/styler.js";
import Post from "../../js/components/post.js";
import PostList from "../../js/components/postList.js";

const post = new Post(0);
const postList = new PostList((id) => {
  post.toggleHidden();
  post.update(id)
});

const $elems = [
  postList,
  post,
];

const $target = document.querySelector("#app");
const $renderer = new Renderer($target);
$elems.forEach(elem => $renderer.add(elem));
$renderer.render();

const $styler = new Styler();
$elems.forEach(elem => $styler.add(elem));
$styler.style();