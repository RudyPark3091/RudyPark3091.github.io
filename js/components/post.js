class Post {
  constructor(data) {
    const $container = document.createElement("div");
    $container.classList.add("post-container");
    this.$container = $container;

    const $content = document.createElement("div");
    $content.classList.add("post-content");
    this.$content = $content;

    const src = data[0].url;
    this.get(src).then(content => {
      this.$content.innerHTML = content;
      this.$container.appendChild(this.$content);
    });
  }

  async get(url) {
    const content = await fetch(url);
    return content.text();
  }

  style() {
    return `
    .post-container {
      position: absolute;
      width: 50%;
      height: 50%;
      padding: 30px;
      border-radius: 5px;
      background-color: rgba(200, 200, 200, 0.5);
      backdrop-filter: blur(12px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default Post;