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
    
    //divider x-coord
    let barX = width * .8;

    //Drag and drop Objects
    function Connection(x,y) {
      this.x = x;
      this.y = y;

      this.draw = function() {

      }

      this.update = function() {

        this.draw();
      }
    }

    function Rackroom(x,y) {
      this.x = x;
      this.y = y;

      this.draw = function() {

      }

      this.update = function() {

        this.draw();
      }
    }

    //set some ctx baselines
    ctx.font="48px righteous";
    ctx.lineWidth = 2;

    //set sizes
    let itemw = width * .2;
    let itemh = height * .2;

    //menu script
    const bar = function(x,y,w,h) {
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(x, y, w, h)
    }

    //our actual animate loop
    const animate = function() {
      requestAnimationFrame(animate);
      ctx.clearRect(0,0,width,height);

      //draw menu separator
      ctx.beginPath()
      ctx.moveTo(barX,0);
      ctx.lineTo(barX,height);
      ctx.stroke();

      //draw right-hand menu
      ctx.fillStyle = "#777777";
      for(let k = 0; k < 3; k++) {
        bar(barX, itemh * k, itemw, itemh)
      }

      //only draw the mousex,mousey if it's in the canvas area
      if(mouse.x != undefined && mouse.x > -1 && mouse.y > -1) {
        ctx.fillStyle = "#000000";
        ctx.fillText(`${mouse.x},${mouse.y}`, Math.floor(width * .84), Math.floor(height * .9));
      }
    }
    animate();
  }
}