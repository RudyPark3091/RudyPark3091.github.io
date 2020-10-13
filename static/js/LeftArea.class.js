class LeftArea {
  constructor(context, target) {
    this.contextObj = {
      home: "Home",
      memo: "Memos",
      article: "Articles"
    };
    this.contextObj[context] = "&lt" + this.contextObj[context] + "&gt";

    this.target = document.querySelector(target);
    this.htmlOp();
  }

  htmlOp() {
    this.target.innerHTML += `
      <div id="left-area">
        ${this.makeLink(this.contextObj.home, "/")}
        ${this.makeLink(this.contextObj.memo, "/memo")}
        ${this.makeLink(this.contextObj.article, "/article")}
      </div>
    `;
  }

  makeLink(name, url) {
    return `<a href="${url}">${name}</a>`;
  }
}
