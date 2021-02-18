class NotFound {
  constructor() {
    const $container = document.createElement("div");
    $container.classList.add("error-notfound");

    const $code = document.createElement("div");
    $code.innerText = "404";

    const $notfound = document.createElement("div");
    $notfound.innerText = "Not Found :(";

    $container.appendChild($code);
    $container.appendChild($notfound);
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .error-notfound > div:nth-child(1) {
      font-size: 50px;
      font-weight: 900;
    }

    .error-notfound > div:nth-child(2) {
      font-size: 40px;
      font-weight: 100;
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default NotFound;