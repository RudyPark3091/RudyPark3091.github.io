class Explorer {
  constructor(context) {
    this.nav = new Navigator();
    this.navigatorUI = this.nav.render("#explorer");
    document.body.innerHTML += `
      ${this.navigatorUI}
      <div id="explorer" class="fadein"></div>
    `;
    this.htmlElement = "";
    this.data = {};
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
      fetch(`/${context}/meta/data.json`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.data = data;
          data.column.forEach((category, i) => {
            this.htmlElement += `
              <svg width="100px" height="100px" fill="#88d4fd" class="explorer-route" data-category="${category}">
                <path d="M0 0 L50 0 L50 10 L90 10 L90 80 L0 80 Z" />
                <text x="50%" y="95px" text-anchor="middle" fill="#000">${category}</text>
              </svg>
            `;
          });

          return data;
        })
        .then((data) => {
          document.querySelector("#explorer").innerHTML = this.htmlElement;
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  handleClick(data) {
    console.log(data);

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
          <svg width="100px" height="100px" fill="#88d4fd" class="explorer-route" data-category="..">
            <path d="M0 0 L50 0 L50 10 L90 10 L90 80 L0 80 Z" />
            <text x="50%" y="95px" text-anchor="middle" fill="#000">..</text>
          </svg>
        `;
        data.records[category].forEach((item) => {
          this.htmlElement += `
          <svg width="100px" height="100px" fill="#88d4fd" class="explorer-route"> 
            <path d="M0 0 L50 0 L50 10 L90 10 L90 80 L0 80 Z" />
            <text x="50%" y="95px" text-anchor="middle" fill="#000">${
              item.title.length > 11
                ? item.title.substring(0, 11) + "..."
                : item.title
            }</text>
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
