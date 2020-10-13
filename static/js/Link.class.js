class Link {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  makeLink(name, url) {
    return `<a href=${url}>${name}</a>`;
  }

  makeByConstructor() {
    return `<a href=${this.url}>${this.name}</a>`;
  }
}
