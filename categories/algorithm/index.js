import Renderer from "../../js/renderer.js";
import Styler from "../../js/styler.js";
import PostList from "../../js/components/postList.js";
import data from "./algorithm.data.js";

const $elems = [
  new PostList(data),
];

const $target = document.querySelector("#app");
const $renderer = new Renderer($target);
$elems.forEach(elem => $renderer.add(elem));
$renderer.render();

const $styler = new Styler();
$elems.forEach(elem => $styler.add(elem));
$styler.style();