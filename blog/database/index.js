import Renderer from "/js/renderer.js";
import Styler from "/js/styler.js";
import data from "./data.js";
import tags from "./tag.js";
import DarkMode from "/js/components/darkmode.js";
import PostList from '/js/components/postList.js';const $elems = [
  new DarkMode(),
new PostList(data, tags),];

const $target = document.querySelector("#app");
if ($target.dataset.markdown.length === 0) $target.removeAttribute("data-markdown");
const $renderer = new Renderer($target);
$elems.forEach(elem => $renderer.add(elem));
$renderer.render();

const $styler = new Styler();
$elems.forEach(elem => $styler.add(elem));
$styler.style();

