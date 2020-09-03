const links = document.querySelectorAll(".link");

links.forEach( link => {
  link.onclick = (e) => {
    e.stopPropagation();
    const target = e.target;
    document.body.classList.add("blackout");
    setTimeout( () => {
      location.href = target.getAttribute("href");
    }, 300);
  }
});