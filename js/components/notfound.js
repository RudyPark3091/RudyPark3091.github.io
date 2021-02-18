class NotFound {
  constructor() {
    const $container = document.createElement("div");
    $container.classList.add("error-notfound");
    $container.innerText = "404 Not Found :(";

    this.$container = $container;
  }

  style() {
    return `
    .error-notfound {
      width: 100%;
      height: 100%;
      background-color: var(--bg-primary-color);
      color: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 50px;
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default NotFound;