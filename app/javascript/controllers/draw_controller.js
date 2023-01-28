import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 
    "canvas" 
    ]

  connect() {
    this.canvasTarget.width = window.innerWidth;
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
  }

  drawCircle(x,y,radius,style) {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.arc(x,y,radius,0,Math.PI * 2,false);
    c.strokeStyle = style;
    c.stroke();
  }

  fillCircle(x,y,radius,style) {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.arc(x,y,radius,0,Math.PI * 2,false);
    c.fillStyle = style;
    c.fill();
  }

  paintCircles() {
    for(let i = 0; i < 150; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * (window.innerHeight * .6);
      let r = Math.random() * 200;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      let a = Math.random();
      let radius = Math.random() * 100;
      let style = `rgba(${r},${g},${b},${a})`;
      if(i%4==0) {
        this.drawCircle(x,y,radius,style);
      } else {
        this.fillCircle(x,y,radius,style);
      }
    }
  }

  driver() {
    const ctx = this.canvasTarget.getContext("2d");
    var width = this.canvasTarget.width;
    var height = this.canvasTarget.height;
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

    let held = false;
    canvas.addEventListener("mousedown", () => {
      held = true;
    })

    canvas.addEventListener("mouseup", () => {
      held = false;
    })

    canvas.addEventListener("mouseout", () => {
      held = false;
    })

    canvas.addEventListener("mouseenter", () => {
      held = false;
    })

    function draw(x,y,radius,stroke,fill, weight) {
      ctx.beginPath();
      ctx.arc(x,y,radius,0,Math.PI * 2,false);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = weight;
      ctx.fillStyle = fill;
      ctx.stroke();
      ctx.fill();
    }

    const animate = function() {
      requestAnimationFrame(animate);
      if(held && mouse.x > 0 && mouse.y > 0) {
        draw(mouse.x,mouse.y, 10, "#bbbbbb", "#bbbbbb", 2);
      }

    }
    animate();

  }

}