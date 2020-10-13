class LeftArea {
  constuctor(context) {
    this.context = {
      home: "Home",
      memo: "Memos",
      article: "Articles"
    };
    this.context[context] = "&lt" + this.context[context] + "&gt";
    this.link = new Link();

    document.body.innerHTML += `
      <div id="left-area">
        ${this.link.makeLink(this.context.home, "/")}
        ${this.link.makeLink(this.context.memo, "/memo")}
        ${this.link.makeLink(this.context.article, "/article")}
      </div>
    `
  }
}
