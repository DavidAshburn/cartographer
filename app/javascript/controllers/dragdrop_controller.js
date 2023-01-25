import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ 
  "canvas" 
  ]

  connect() {
    this.canvasTarget.width = Math.floor(window.innerWidth * .92);
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
  }

  clear() {
    let ctx = this.canvasTarget.getContext("2d");
    ctx.beginPath();
    ctx.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);
  }

  georgeStGeegland() {
    let ctx = this.canvasTarget.getContext("2d");
    ctx.font="48px righteous";
    ctx.fillText("Oooooh, Hello", 10,50);
  }

  gillFaizan() {
    let width = this.canvasTarget.width;
    let height = this.canvasTarget.height;
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
    canvas.addEventListener('mousedown',
      function(event) {
        console.log("mousedown");
      })
    canvas.addEventListener('mouseup',
      function(event) {
        console.log("mouseup");
      })
    canvas.addEventListener('mouseout',
      function(event) {
        console.log("mouseout");
      })

    //Drag and drop Objects
    function Circle(x,y,label,fill="#0891b2",stroke="#fcd34d") {
      this.x = x;
      this.y = y;
      this.label = label;
      this.radius = Math.min(height * .1, 30);
      this.fill = fill;
      this.stroke = stroke;
      this.held = false;
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.fill;
        ctx.stroke();
        ctx.fill();

        ctx.font = "24px righteous";
        ctx.fillText(this.label, this.x + this.radius + 15, this.y + 5);
      }
      this.update = function() {
        if(this.held) {
          this.x = mouse.x;
          this.y = mouse.y;
        }
        this.draw();
      }
    }

    //Prepping for animate function
    //divider x-coord
    let barX = width * .8;

    //set some ctx baselines
    ctx.font="48px righteous";
    ctx.lineWidth = 2;

    //set sizes
    let itemw = width * .2;
    let itemh = height * .2;

    //menu item script
    const bar = function(x,y,w,h) {
      ctx.fillRect(x, y, w, h)
      ctx.strokeRect(x, y, w, h)
    }

    //Populate some stuff without drag and drop
    let firstElement = new Circle(100,100,"Mainline");

    //our actual animate loop
    const animate = function() {
      requestAnimationFrame(animate);
      ctx.clearRect(0,0,width,height);
      
      ctx.strokeStyle = "#1c1917"
      //draw menu separator
      ctx.beginPath()
      ctx.moveTo(barX,0);
      ctx.lineTo(barX,height);
      ctx.stroke();

      //draw right-hand menu
      ctx.fillStyle = "#3b82f6"
      for(let k = 0; k < 3; k++) {
        bar(barX, itemh * k, itemw, itemh)
      }

      firstElement.update();

      //only draw the mousex,mousey if it's in the canvas area
      if(mouse.x > -1 && mouse.y > -1) {
        ctx.fillText(`${mouse.x},${mouse.y}`, Math.floor(width * .84), Math.floor(height * .9));
      }
    }
    animate();
  }


}