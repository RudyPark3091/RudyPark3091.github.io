class Renderer {
  constructor($target) {
    this.$target = $target;
    this.$elems = [];
  }

  add(component) {
    this.$elems.push(component);
  }

  render() {
    this.$target.innerHTML = "";
    this.$elems.forEach((elem) => this.$target.appendChild(elem.render()));
  }
}

export default Renderer;
