function setup() {
  let c = createCanvas(600, 600);
  c.canvas.addEventListener("contextmenu", e => e.preventDefault());
  c.canvas.style.marginTop = ((window.innerHeight - height) / 2.5) + "px";
  // put setup code here
}

function draw() {
  background(bcolor);
  // put drawing code here
}
