import Renderer from "./js/renderer.js";
import Styler from "./js/styler.js";

const $target = document.querySelector("#app");
const $elems = [];

const $renderer = new Renderer();
$elems.forEach(elem => $renderer.add(elem));
$renderer.render();

const $styler = new Styler();
$elems.forEach(elem => $styler.add(elem));
$styler.style();