class Tags {
  constructor(items) {
    this.items = items;

    const $container = document.createElement("div");
    $container.classList.add("postlist-tags");

    const $tags =
      items.map((tag) => `<div class="postlist-tags-item" style="background-color:${tag.color};">${tag}</div>`);
      // items.map((tag) => `<div class="postlist-tags-item" style="background-color:${tag.color};">${tag.name}</div>`);
    $container.innerHTML = $tags.join("");

    this.$container = $container;
  }

  style() {
    return `
    .postlist-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .postlist-tags-item {
      font-size: 0.8rem;
      padding: 2px 10px;
      margin: 3px;
      background-color: var(--light-color);
      border-radius: 5px;
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default Tags;