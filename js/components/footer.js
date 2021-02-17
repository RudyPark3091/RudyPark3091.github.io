class Footer {
  constructor() {
    const $container = document.createElement("footer");
    $container.innerHTML =
      `<div>Icons made by ... from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`;

    this.$container = $container;
  }

  style() {
    return `
    footer {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      background-color: var(--bg-light-color);
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    footer * {
      color: var(--primary-color);
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default Footer;
