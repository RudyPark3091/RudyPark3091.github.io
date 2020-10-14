class Navigator {
  constructor() {
    this.routes = [];
  }

  render() {
    return `
    <div id="navigator-bar" class="fadein">
      <div id="red" class="navigator-traffic-light"></div>
      <div id="yellow" class="navigator-traffic-light"></div>
      <div id="green" class="navigator-traffic-light"></div>
    </div>
    <div id="navigator-buttons" class="fadein">
      <div id="navbuttons-back" class="navbuttons"></div>
      <div id="navbuttons-forward" class="navbuttons"></div>
      <div id="navbuttons-address" class="navbuttons"></div>
    </div>
    `;
  }
}
