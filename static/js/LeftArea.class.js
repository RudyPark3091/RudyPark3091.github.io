class LeftArea {
  constuctor(context) {
    this.context = {
      "home": "Home",
      "memo": "Memos",
      "article": "Articles"
    };
    this.context[context] = "&lt" + this.context[context] + "&gt";

    document.body.innerHTML += `
      <div id="left-area">
        ${this.makeLink(this.context.home, "/")}
        ${this.makeLink(this.context.memo, "/memo")}
        ${this.makeLink(this.context.article, "/article")}
      </div>
    `;
  }

  htmlOp() {
    document.body.innerHTML += `
      <div id="left-area">
        ${this.makeLink(this.context.home, "/")}
        ${this.makeLink(this.context.memo, "/memo")}
        ${this.makeLink(this.context.article, "/article")}
      </div>
    `;
  }

  makeLink(name, url) {
    return `<a href=${url}>${name}</a>`;
  }
}
