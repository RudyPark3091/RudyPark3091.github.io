class Explorer {
  constructor(context) {
    this.nav = new Navigator();
    this.navigatorUI = this.nav.render("#explorer");
    document.body.innerHTML += `
      ${this.navigatorUI}
      <div id="explorer" class="fadein"></div>
    `;
    this.htmlElement = "";
    this.data = jsonData;
    this.context = context;
    this.render(this.context)
      .then((data) => {
        this.handleClick(data);
        return data;
      })
      .then((data) => {
        document.querySelector("#explorer").addEventListener("change", (e) => {
          this.handleClick(data);
        });
      });

    this.routes = [];
    this.elements = [];
  }

  render(context) {
    return new Promise((resolve, reject) => {
      this.data.column.forEach((category, i) => {
        this.htmlElement += `
          <svg width="500px" height="50px" fill="#88d4fd" class="explorer-route" data-category="${category}">
            <path d="M0 0 L30 0 L30 5 L50 5 L50 40 L0 40 Z" />
            <text x="20%" y="25px" text-anchor="left" fill="#000">${category}</text>
          </svg>
        `;
      });
      document.querySelector("#explorer").innerHTML = this.htmlElement;
      resolve(this.data);
    });
  }

  handleClick(data) {

    const folders = document.querySelectorAll(".explorer-route");
    folders.forEach((folder) => {
      folder.onclick = (e) => {
        let target = e.target;
        if (target.dataset.category === undefined) {
          target = target.parentNode;
        }
        const category = target.dataset.category;

        if (category === "..") {
          this.popOp(data);
          return;
        } else {
          this.pushOp(this.context, this.htmlElement);
        }

        this.htmlElement = `
          <svg width="500px" height="50px" fill="#88d4fd" class="explorer-route" data-category="..">
            <path d="M0 0 L30 0 L30 5 L50 5 L50 40 L0 40 Z" />
            <text x="20%" y="25px" text-anchor="left" fill="#000">..</text>
          </svg>
        `;
        data.records[category].forEach((item) => {
          this.htmlElement += `
          <svg width="500px" height="50px" fill="#88d4fd" class="explorer-route"> 
            <path d="M0 0 L30 0 L30 5 L50 5 L50 40 L0 40 Z" />
            <text x="20%" y="25px" text-anchor="left" fill="#000">${item.title}</text>
          </svg>
        `;
        });
        document.querySelector("#explorer").innerHTML = this.htmlElement;
        this.handleClick(data);
      };
    });
  }

  pushOp(context, element) {
    this.routes.push(context);
    this.elements.push(element);
    console.log("pushed", this.routes);
  }

  popOp(data) {
    const targetContext = this.routes.pop();
    const htmlElement = this.elements.pop();

    document.querySelector("#explorer").innerHTML = htmlElement;
    console.log("popped", this.routes);
    this.handleClick(data);
    return 0;
  }
}
