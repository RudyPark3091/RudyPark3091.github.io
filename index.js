import Renderer from "./js/renderer.js";
import Styler from "./js/styler.js";
import Namecard from "/js/components/namecard.js";
import Categories from "/js/components/categories.js";
import DarkMode from "/js/components/darkmode.js";

const $elems = [new Namecard(), new Categories(), new DarkMode()];

const $target = document.querySelector("#app");
const $renderer = new Renderer($target);
$elems.forEach((elem) => $renderer.add(elem));
$renderer.render();

const $styler = new Styler();
$elems.forEach((elem) => $styler.add(elem));
$styler.style();
