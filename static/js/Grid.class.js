class Grid {
  constructor(context) {
    this.context = context;

    document.body.innerHTML += `
      <div id="grid-body" class="fade-in">
        ${this.generateItem("hello", "2020-10-14", "o")}
      </div>
    `;
  }

  generateItem(title, date, url) {
    return `
      <div class="grid-item">
        <div class="grid-item-title">${title}</div>
        <div class="grid-item-date">${date}</div>
      </div>
    `;
  }
}
