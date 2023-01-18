import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ 
  "canvas" 
  ]

  connect() {
    this.canvasTarget.width = window.innerWidth;
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
  }

  drawLine(x,y,tx,ty,style) {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(tx, ty);
    c.strokeStyle = style;
    c.stroke();
  }

  fillRect(x,y,w,h,style) {
    let c = this.canvasTarget.getContext("2d");
    c.fillStyle = style;
    c.fillRect(x,y,w,h);
  }

  drawSquare(x,y,length,style) {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.moveTo(x,y);
    c.lineTo(x,y+length);
    c.lineTo(x+length,y+length);
    c.lineTo(x+length,y);
    c.lineTo(x,y);
    c.strokeStyle = style;
    c.stroke();
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

  markings(x) {
    this.drawSquare(0,0,x);
    for(let i = x; i < window.innerWidth; i += x) {
      this.drawLine(i,0,i,10);
    }
    for(let j = x; j < window.innerHeight * .6; j += x) {
      this.drawLine(0,j,10,j);
    }
  }

  clear() {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);
  }


  drawBubbles() {
    for(let i = 0; i < 250; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * (window.innerHeight * .6);
      let r = Math.random() * 255;
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

  // c.beginPath();
  // c.arc(200,200,30,0,Math.PI*2,false);
  // c.strokeStyle = 'blue';
  // c.stroke();

  randomCircles() {
    const c = this.canvasTarget.getContext("2d");

    const animate = function() {
      requestAnimationFrame(animate);

      for(let i = 0; i < 1; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * (window.innerHeight * .6);

        let radius = Math.random() * 100;
        let style = `rgba(${Math.random() * 50},${Math.random() * 255},${Math.random() * 255},${Math.random()})`;
        if(i%3==0) {
          c.beginPath();
          c.arc(x,y,radius,0,Math.PI * 2,false);
          c.strokeStyle = style;
          c.stroke();
        } else {
          c.beginPath();
          c.arc(x,y,radius,0,Math.PI * 2,false);
          c.fillStyle = style;
          c.fill();
        }
      }
    }
    
    animate();
  }

  movingCircle() {
    const c = this.canvasTarget.getContext("2d");
    var width = this.canvasTarget.width;
    var height = this.canvasTarget.height;
    
    var radius = 30;
    var x = Math.min(Math.max(Math.random() * width, radius + 1), width - radius);
    var y = Math.min(Math.max(Math.random() * height, radius + 1), height - radius);
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;

    const animate = function() {
      requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      c.beginPath();
      c.arc(x,y,radius,0,Math.PI * 2,false);
      c.fillStyle = "#dd5512";
      c.fill();
      
      if(x + radius > width || x - radius < 0)
        dx = -dx;
      if(y + radius > height || y - radius < 0)
        dy = -dy;

      x += dx;
      y += dy;

    }
    animate();
  }

  manyCircles() {
    const c = this.canvasTarget.getContext("2d");
    var width = this.canvasTarget.width;
    var height = this.canvasTarget.height;
    
    

    function Circle(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = "#dd5512";
        c.fillStyle = "#efa395";
        c.stroke();
        c.fill();
      }

      this.update = function() {
        if(this.x + this.radius > width || this.x - this.radius < 0)
          this.dx = -this.dx;
        if(this.y + this.radius > height || this.y - this.radius < 0)
          this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    let randoC = function(w,h) {
      let out = [];
      let speedMult = 3;
      let r = Math.max(Math.random() * 30, 5);
      out.push(Math.min(Math.max(Math.random() * w, r + 1), w - r));
      out.push(Math.min(Math.max(Math.random() * h, r + 1), h - r));
      out.push((Math.random() - 0.5) * speedMult);
      out.push((Math.random() - 0.5) * speedMult);
      out.push(r);
      return out;
    }

    let circleArray = [];
    for(let i = 0; i < 100; i++) {
      circleArray.push(new Circle(...randoC(width,height)));
    }

    const animate = function() {
      requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      for(let circle of circleArray) {
        circle.update(); 
      }

    }
    animate();
  }

  mouseCircles() {
    const c = this.canvasTarget.getContext("2d");
    var width = this.canvasTarget.width;
    var height = this.canvasTarget.height;

    let mouse = {
      x: undefined,
      y: undefined
    }

    //offset for distance from top of window to top of canvas, corrects mouse y coordinate
    let cOffset = window.pageYOffset + this.canvasTarget.getBoundingClientRect().top;
    
    window.addEventListener('mousemove',
      function(event) {
        mouse.x = event.x;
        mouse.y = event.y - cOffset;
      })

    function Circle(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = "#dd5512";
        c.fillStyle = "#efa395";
        c.stroke();
        c.fill();
      }

      this.update = function() {
        //wall bounces
        if(this.x + this.radius > width || this.x - this.radius < 0)
          this.dx = -this.dx;
        if(this.y + this.radius > height || this.y - this.radius < 0)
          this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(Math.sqrt((mouse.x-this.x)*(mouse.x-this.x)+(mouse.y-this.y)*(mouse.y-this.y)) < this.radius) {
          this.radius += 1;
        }



        this.draw();
      }
    }

    let randoC = function(w,h) {
      let out = [];
      let speedMult = 3;
      let r = Math.max(Math.random() * 30, 5);
      out.push(Math.min(Math.max(Math.random() * w, r + 1), w - r));
      out.push(Math.min(Math.max(Math.random() * h, r + 1), h - r));
      out.push((Math.random() - 0.5) * speedMult);
      out.push((Math.random() - 0.5) * speedMult);
      out.push(r);
      return out;
    }

    let circleArray = [];
    for(let i = 0; i < 10; i++) {
      circleArray.push(new Circle(...randoC(width,height)));
    }

    const animate = function() {
      requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      for(let circle of circleArray) {
        circle.update(); 
      }

    }
    animate();
  }

}