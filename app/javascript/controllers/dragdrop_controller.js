import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ 
  "canvas" 
  ]

  connect() {
    this.canvasTarget.width = Math.floor(window.innerWidth * .92);
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
  }

  drawText() {
    let ctx = this.canvasTarget.getContext("2d");
    ctx.font="48px righteous";
    ctx.fillText("Oooooh, Hello", 10,50);
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
        if(mouse.x > rect.width)
          mouse.x = -1;
        if(mouse.y > rect.height)
          mouse.y = -1;
      })

    ctx.font="48px righteous";
    ctx.lineWidth = 3;
    
    //divider x-coord
    let barX = width * .8;

    //Drag and drop Objects
    function Connection() {

      this.draw = function() {

      }

      this.update = function() {

        this.draw();
      }


    }

    //our actual animate loop
    const animate = function() {
      requestAnimationFrame(animate);
      ctx.clearRect(0,0,width,height);


      ctx.beginPath()
      ctx.moveTo(barX,0);
      ctx.lineTo(barX,height);
      ctx.stroke();

      ctx.fillStyle = "#777777";
      ctx.fillRect(barX + 2, 0, width * .2, height * .2)
      ctx.strokeRect(barX + 2, 0, width * .2, height * .2)

      ctx.fillRect(barX + 2, height * .2, width * .2, height * .2)
      ctx.strokeRect(barX + 2, height * .2, width * .2, height * .2)

      ctx.fillRect(barX + 2, height * .4, width * .2, height * .2)
      ctx.strokeRect(barX + 2, height * .4, width * .2, height * .2)

      if(mouse.x != undefined && mouse.x > -1 && mouse.y > -1) {
        ctx.fillStyle = "#000000";
        ctx.fillText(`${mouse.x},${mouse.y}`, Math.floor(width * .84), Math.floor(height * .9));
      }
    }
    animate();
  }
}