import * as marked from "../lib/marked.min.js";
import data from "../../categories/algorithm/algorithm.data.js";
import XButton from "./xButton.js";
import NotFound from "./notfound.js";
import Loading from "./loading.js";

class Post {
  constructor(w = "60%", h = "80%", mw = "80%", mh = "80%") {
    this.w = w;
    this.h = h;
    this.mw = mw;
    this.mh = mh;

    const $container = document.createElement("div");
    $container.classList.add("post-container");
    $container.classList.add("hidden");
    this.$container = $container;

    const $content = document.createElement("div");
    $content.classList.add("post-content");
    this.$content = $content;

    this.$xbutton = new XButton(() => this.toggleHidden());
    this.$notfound = new NotFound();
    this.$loading = new Loading();
    this.$container.appendChild(this.$content);
    this.$container.appendChild(this.$xbutton.render());
  }

  update(id) {
    const endpoint = "https://raw.githubusercontent.com/RudyPark3091/RudyPark3091.github.io/master";
    const target = data.filter(it => it.id === +id)[0];
    const src = target.url[0] === "/" ? endpoint + target.url : target.url;
    this.get(src).then(content => {
      const $html = window.marked(content);
      this.$content.innerHTML = $html;
      this.addPaddingToContent();
      this.$container.appendChild(this.$xbutton.render());
    }).catch((e) => {});
  }

  async get(url) {
    this.$content.innerHTML = this.$loading.render().outerHTML;
    const content = await fetch(url)
      .then(res => {
        if (res.status >= 400) throw new Error("not found");
        return res.text();
      })
      .catch((e) => {
        this.$content.innerHTML = this.$notfound.render().outerHTML;
      });
    return content;
  }

  addPaddingToContent() {
    const $padding = document.createElement("div");
    $padding.classList.add("post-padding");
    this.$content.appendChild($padding);
  }

  toggleHidden() {
    this.$container.classList.toggle("hidden");
  }

  style() {
    return this.$xbutton.style()
      + this.$notfound.style()
      + this.$loading.style()
      + `
    .post-container {
      --xbutton-top: 8%;
      --xbutton-right: 10%;
      position: absolute;
      width: ${this.w};
      height: ${this.h};
      padding: 30px;
      border-radius: 5px;
      background-color: var(--bg-primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: scroll;
    }

    .post-container.hidden {
      display: none;
    }

    .post-content {
      width: 100%;
      height: 100%;
      word-break: break-all;
    }

    .post-content code {
      padding: 2px 7px;
      background-color: var(--bg-secondary-color);
      border-radius: 5px;
    }

    .post-content pre {
      --padding: 10px;
      width: calc(100% - var(--padding) * 2);
      background-color: var(--bg-secondary-color);
      border-radius: 5px;
      padding: var(--padding);
      overflow: scroll;
    }

    .post-content .post-padding {
      padding-bottom: 30px;
    }

    @media screen and (max-width: 900px) {
      .post-container {
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

export default Post;