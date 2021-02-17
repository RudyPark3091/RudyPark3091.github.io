class Namecard {
  constructor() {
    const $container = document.createElement("div");
    $container.classList.add("namecard");

    const $label = document.createElement("a");
    $label.innerText = "@RudyPark3091";
    $label.setAttribute("href", "https://github.com/RudyPark3091");
    $label.setAttribute("target", "blank");

    const $email = document.createElement("span");
    $email.innerText = "grayblack313@gmail.com";
    $email.style.color = "var(--secondary-color)";

    $container.appendChild($label);
    $container.appendChild($email);

    this.$container = $container;
  }

  style() {
    return `
    .namecard {
      margin-bottom: 10px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--primary-color);
    }

    .namecard > a {
      text-decoration: none;
      font-size: 30px;
    }

    @media screen and (max-width: 900px) {
      .namecard {
        margin-bottom: 30px;
      }
    }
    `;
  }

  render() {
    return this.$container;
  }
}

export default Namecard;
