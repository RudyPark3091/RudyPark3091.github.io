import Tags from "./tags.js";

class PostList {
  constructor(data, tags, w = "576px", h = "80%", mw = "80%", mh = "80%") {
    this.w = w;
    this.h = h;
    this.mw = mw;
    this.mh = mh;

    const $container = document.createElement("div");
    $container.classList.add("postlist-container");

    const $items = data.map(it => this.wrapUp(it));
    $items.forEach(item => $container.appendChild(item));

    this.$tags = new Tags(tags);

    this.$container = $container;
    this.$container.onclick = (e) => {
      location.href = "#"
    }
  }

  wrapUp(_data) {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("postlist-wrapper");
    $wrapper.dataset.id = _data.id;

    $wrapper.innerHTML = `
    <div class="postlist-title">
      <img src="${_data.icon}" width="40px" alt=""/>
      <span>${_data.title}</span>
    </div>
    `;
    $wrapper.appendChild(new Tags(_data.tags).render());

    return $wrapper;
  }

  style() {
    return this.$tags.style() + `
    .postlist-container {
      width: ${this.w};
      height: ${this.h};
      background-color: var(--bg-secondary-color);
      overflow: scroll;
      border-radius: 5px;
    }

    .postlist-wrapper {
      margin: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .postlist-title {
      display: flex;
      align-items: center;
    }
    
    .postlist-title > *,
    .postlist-wrapper > * {
      margin: 7px 10px;
    }

    @media screen and (max-width: 900px) {
      .postlist-wrapper {
        margin: 25px;
        flex-direction: column;
        justify-content: center;
        align-items: space-between;
      }

      .postlist-wrapper * {
        margin: 0px;
      }

      .postlist-title > * {
        margin: 10px;
      }
    }

    @media screen and (max-width: 900px) {
      .postlist-container {
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

export default PostList;