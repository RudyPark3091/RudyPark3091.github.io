import * as marked from "../lib/marked.min.js";
import XButton from "./xButton.js";
import NotFound from "./notfound.js";
import Loading from "./loading.js";

class Post {
  constructor(md, w = "50%", h = "80%", mw = "80%", mh = "80%") {
    this.w = w;
    this.h = h;
    this.mw = mw;
    this.mh = mh;

    const $container = document.createElement("div");
    $container.classList.add("post-container");
    this.$container = $container;

    const $content = document.createElement("div");
    $content.classList.add("post-content");
    $content.innerHTML = md;
    this.$content = $content;

    this.$xbutton = new XButton(() => history.back());
    this.$notfound = new NotFound();
    this.$loading = new Loading();
    this.$container.appendChild(this.$content);
    this.$container.appendChild(this.$xbutton.render());
  }

  update(id) {
    const target = data.filter((it) => it.id === +id)[0];

    // // for production env
    // const endpoint = "https://raw.githubusercontent.com/RudyPark3091/RudyPark3091.github.io/master";
    // const src = target.url[0] === "/" ? endpoint + target.url : target.url;

    // for development env
    const src = target.url;

    this.get(src)
      .then((content) => {
        const $html = window.marked(content);
        this.$content.innerHTML = $html;
        this.addPaddingToContent();
        this.$container.appendChild(this.$xbutton.render());
      })
      .catch((e) => {});
  }

  async get(url) {
    this.$content.innerHTML = this.$loading.render().outerHTML;
    const content = await fetch(url)
      .then((res) => {
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
    return (
      this.$xbutton.style() +
      this.$notfound.style() +
      this.$loading.style() +
      `
    .post-container {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 30px;
      border-radius: 5px;
      background-color: var(--bg-primary-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: scroll;
      scrollbar-width: 0px;
      scrollbar-color: transparent;
    }

    .post-container::-webkit-scrollbar {
      display: none;
    }

    .post-container.hidden {
      display: none;
    }

    .post-content {
      width: ${this.w};
      height: ${this.h};
      word-break: break-all;
    }

    .post-content h6 {
      margin: 5px;
    }

    .post-content h2 {
      margin-top: 35px;
      margin-bottom: 20px;
    }

    .post-content h3 {
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .post-content h3:last-child {
      color: #888888;
      font-size: 1rem;
      padding-bottom: 2rem;
    }

    .post-content p > code {
      padding: 2px 5px;
      border-radius: 5px;
      background-color: var(--bg-secondary-color);
    }

    pre {
      margin-top: 25px;
      margin-bottom: 25px;
    }

    .post-content pre > code {
      font-family: "victor mono", sans-serif;
      font-size: 0.7rem;
      padding: 20px;
    }

    .post-content pre {
      --padding: 10px;
      width: calc(100% - var(--padding) * 2);
      border-radius: 5px;
      padding: var(--padding);
      overflow: scroll;
    }

    .post-content .post-padding {
      padding-bottom: 30px;
    }

    @media screen and (max-width: 1180px) {
      .post-content {
        width: calc(${this.w} + 10%);
        height: calc(${this.h} + 10%);
      }
    }

    @media screen and (max-width: 900px) {
      .post-content {
        width: calc(${this.mw} - 10%);
        height: calc(${this.mh} - 10%);
      }
    }

    @media screen and (max-width: 740px) {
      .post-content {
        width: ${this.mw};
        height: ${this.mh};
      }
    }
    `
    );
  }

  render() {
    return this.$container;
  }
}

export default Post;
