import * as marked from "/js/lib/marked.min.js";
import Styler from "/js/styler.js";
import Post from "/js/components/post.js";

const decode64 = (str) => {
  return decodeURIComponent(atob(str).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

const $app = document.querySelector("#app");
const $container = document.createElement("div");
$container.classList.add("post-container");
const $content = document.createElement("div");
$content.classList.add("post-content");

const md = decode64($app.dataset.markdown);
$app.removeAttribute("data-markdown");
$container.appendChild($content);
$app.appendChild($container);

const html = window.marked(md);
$content.innerHTML = html;

const post = new Post();
const styler = new Styler();
styler.add(post);
styler.style();
