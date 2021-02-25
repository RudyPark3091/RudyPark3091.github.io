import * as marked from "/js/lib/marked.min.js";
import Styler from "/js/styler.js";
import Renderer from "/js/renderer.js";
import Post from "/js/components/post.js";
import DarkMode from "/js/components/darkmode.js";

const decode64 = (str) => {
  return decodeURIComponent(atob(str).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

const $app = document.querySelector("#app");

const md = decode64($app.dataset.markdown);
$app.removeAttribute("data-markdown");

const html = window.marked(md);

const elems = [
  new Post(html),
  new DarkMode(),
];

const styler = new Styler();
elems.forEach(elem => styler.add(elem));
styler.style();

const renderer = new Renderer($app);
elems.forEach(elem => renderer.add(elem));
renderer.render();