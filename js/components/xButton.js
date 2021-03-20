class XButton {
  constructor(
    handleClick,
    size = "1.2rem",
    offset = "1.2rem",
    mediaOffset = "2rem"
  ) {
    this.size = size;
    this.offset = offset;
    this.mediaOffset = mediaOffset;

    const $container = document.createElement("div");
    $container.classList.add("xbutton-container");

    const $wrapper = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    $wrapper.setAttribute("width", size);
    $wrapper.setAttribute("height", size);

    const $upper = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    $upper.setAttribute("x1", 0);
    $upper.setAttribute("y1", 0);
    $upper.setAttribute("x2", size);
    $upper.setAttribute("y2", size);
    $upper.setAttribute("stroke", "#888");
    $upper.setAttribute("stroke-width", "2");

    const $lower = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    $lower.setAttribute("x1", 0);
    $lower.setAttribute("y1", size);
    $lower.setAttribute("x2", size);
    $lower.setAttribute("y2", 0);
    $lower.setAttribute("stroke", "#888");
    $lower.setAttribute("stroke-width", "2");

    $wrapper.appendChild($upper);
    $wrapper.appendChild($lower);
    $container.appendChild($wrapper);

    this.$container = $container;
    this.$container.onclick = (e) => {
      handleClick();
    };
  }

  style() {
    return `
    .xbutton-container {
      width: ${this.size}px;
      height: ${this.size}px;
      position: fixed;
      top: ${this.offset};
      right: ${this.offset};
      cursor: pointer;
    }

    @media screen and (max-width: 900px) {
      .xbutton-container {
        top: ${this.mediaOffset};
        right: ${this.mediaOffset};
      }
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default XButton;
