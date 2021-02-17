class Renderer {
  constructor() {
    this.$elems = [];
  }

  add(component) {
    this.$elems.push(component);
  }

  render() {
    this.$elems.forEach(elem => elem.render());
  }
}

export default Renderer;
