import data from "/categories.data.js";

class Categories {
  constructor(w = "30%", h = "50%", mw = "70%", mh = "30%") {
    this.w = w;
    this.h = h;
    this.mw = mw;
    this.mh = mh;

    const $container = document.createElement("div");
    $container.classList.add("categories-container");

    const $items = data.map((it) => this.wrapUp(it));
    $items.forEach((item) => $container.appendChild(item));

    this.$container = $container;
  }

  wrapUp(data) {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("categories-wrapper");

    const $icon = document.createElement("img");
    $icon.setAttribute("src", data.icon);
    $icon.setAttribute("width", "40px");
    $icon.setAttribute("alt", "");
    
    const $link = document.createElement("a");
    $link.classList.add("categories-link");
    $link.innerText = data.name;
    $link.setAttribute("href", data.url);

    $wrapper.appendChild($icon);
    $wrapper.appendChild($link);
    return $wrapper
  }

  style() {
    return `
    .categories-container {
      width: ${this.w};
      height: ${this.h};
      padding: 10px;
      display: flex;
      flex-direction: column;
      overflow: scroll;
      background-color: var(--bg-light-color);
      border-radius: 5px;
    }

    .categories-wrapper {
      margin: 5px;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
    }

    .categories-wrapper > * {
      margin: 10px;
    }

    .categories-wrapper a {
      text-decoration: none;
    }

    @media screen and (max-width: 900px) {
      .categories-container {
        width: ${this.mw};
        height: ${this.mh};
      }
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default Categories;
