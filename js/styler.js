class Styler {
  constructor() {
    this.$elems = [];
    this.$text = "";
  }

  add(component) {
    this.$elems.push(component);
    this.$text += component.style();
  }

  style() {
    const $style = document.createElement("style");
    $style.textContent = this.$text;
    document.head.appendChild($style);
  }
}

export default Styler;