const elements = document.querySelectorAll(".blur");

elements.forEach( element => {
  element.onclick = (e) => {
    e.stopPropagation();
    document.body.style.filter = "blur(10px)";
  }
})

document.onclick = (e) => {
  e.stopPropagation();
  document.body.style.filter = "blur(0px)";
}