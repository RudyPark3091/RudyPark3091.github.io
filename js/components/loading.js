class Loading {
  constructor(w = "30px", h = "30px") {
    this.w = w;
    this.h = h;

    const $container = document.createElement("div");
    $container.classList.add("loading-spinner-container");

    const $body = document.createElement("div");
    $body.classList.add("loading-spinner-body");

    this.$container = $container;
    this.$container.appendChild($body);
  }

  style() {
    return `
    .loading-spinner-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loading-spinner-body {
      width: ${this.w};
      height: ${this.h};
      border: 3px solid var(--secondary-color);
      border-bottom: 3px solid transparent;
      animation: 1s spin linear infinite;
      border-radius: 50%;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default Loading;