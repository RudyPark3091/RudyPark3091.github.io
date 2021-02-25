class DarkMode {
  constructor() {
    this.DM_KEYWORD = "rudypark3091.github.io.darkmode";
    this.isDarkMode = !!localStorage.getItem(this.DM_KEYWORD);

    const $container = document.createElement("div");
    $container.classList.add("darkmode-container");
    $container.innerHTML = `
    <div class="darkmode-toggler">
      <div class="darkmode-toggler-head"></div>
    </div>
    <div class="darkmode-label">dark mode</div>
    `;

    const $label = $container.querySelector(".darkmode-label");
    this.isDarkMode =
      this.isDarkMode ??
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (this.isDarkMode) {
      document.body.classList.add("dark");
      $container.classList.add("on");
    }

    $container.querySelector(".darkmode-toggler").onclick = (e) => {
      document.body.classList.toggle("dark");
      $container.classList.toggle("on");
      this.toggleDarkMode();
    };

    this.$container = $container;
  }

  toggleDarkMode() {
    if (this.isDarkMode) {
      this.isDarkMode = false;
      localStorage.setItem(this.DM_KEYWORD, "");
    } else {
      this.isDarkMode = true;
      localStorage.setItem(this.DM_KEYWORD, true);
    }
  }

  style() {
    return `
    .darkmode-container {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 90px;
      height: 20px;
    }

    .darkmode-toggler {
      width: 40px;
      height: 20px;
      border-radius: 40px;
      background-color: #888;
      transition: background-color 0.3s ease-in-out;
    }

    .darkmode-toggler-head {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      position: absolute;
      top: 1px;
      left: 1px;
      background-color: #fff;
      transition: transform 0.3s ease-in-out;
    }

    .darkmode-container.on .darkmode-toggler-head {
      transform: translateX(20px);
    }

    .darkmode-container.on .darkmode-toggler {
      background-color: #7c5;
    }

    .darkmode-container.on .darkmode-toggler-head {
      background-color: #444;
    }

    .darkmode-label {
      font-size: 10px;
      position: absolute;
      top: 4px;
      right: 0px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .on .darkmode-label {
      opacity: 1;
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default DarkMode;
