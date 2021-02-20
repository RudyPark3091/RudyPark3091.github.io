import Renderer from "/js/renderer.js";
import Styler from "/js/styler.js";
import PostList from '/js/components/postlist.js';const $elems = [
new PostList(),];

const $target = document.querySelector("#app");
if ($target.dataset.markdown.length === 0) $target.removeAttribute("data-markdown");
const $renderer = new Renderer($target);
$elems.forEach(elem => $renderer.add(elem));
$renderer.render();

const $styler = new Styler();
$elems.forEach(elem => $styler.add(elem));
$styler.style();

