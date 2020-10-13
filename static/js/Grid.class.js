class Grid {
  constructor(context) {
    this.context = context;

    document.body.innerHTML += `
      <div id="grid-body" className="fade-in">
        ${this.generateItem("hello", "2020-10-14", "o")}
      </div>
    `;
  }

  generateItem(title, date, url) {
    return `
      <div className="grid-item">
        <div className="grid-item-title">${title}</div>
        <div className="grid-item-date">${date}</div>
      </div>
    `;
  }
}
