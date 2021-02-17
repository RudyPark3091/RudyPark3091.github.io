import data from "../../categories/data.js";

class Categories {
  constructor() {
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
      width: 30%;
      height: 50%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      overflow-Y: scroll;
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

    @media screen and (max-width: 900px) {
      .categories-container {
        width: 70vw;
        height: 30vh;
      }
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default Categories;
