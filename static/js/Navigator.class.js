class Navigator {
  constructor() {
    this.routes = [];
  }

  render() {
    return `
    <div id="navigator" class="fadein">
      <div id="red" class="navigator-traffic-light"></div>
      <div id="yellow" class="navigator-traffic-light"></div>
      <div id="green" class="navigator-traffic-light"></div>
    </div>`;
  }
}
