import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ 
  "canvas" 
  ]

  connect() {
    this.canvasTarget.width = window.innerWidth;
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
  }

  drawText() {
    let ctx = this.canvasTarget.getContext("2d");
    ctx.font="48px righteous";
    ctx.fillText("Oooooh, Hello", 10, 50);
  }

  driver() {
    let width = this.canvasTarget.width;
    let height = this.canvasTarget.height;
    //offset for distance from top of window to top of canvas, corrects mouse y coordinate
    let cOffset = window.pageYOffset + this.canvasTarget.getBoundingClientRect().top;
    let ctx = this.canvasTarget.getContext("2d");
    let rect = this.canvasTarget.getBoundingClientRect();
    let mouse = {
      x: undefined,
      y: undefined
    }
    window.addEventListener('mousemove',
      function(event) {
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
      })

    ctx.font="48px righteous";

    //our actual animate loop
    const animate = function() {
      requestAnimationFrame(animate);
      ctx.clearRect(0,0,width,height);

      ctx.fillText(`${mouse.x},${mouse.y}`, 10, 50);
    }
    animate();
  }
}