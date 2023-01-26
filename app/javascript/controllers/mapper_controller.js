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

  clear() {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);
  }

  drawBubbles() {
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
    for(let i = 0; i < 200; i++) {
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

    //Circle Object manages itself entirely with calls to update()
    function Circle(x, y, dx, dy, radius, stroke, fill) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.stroke = stroke;
      this.fill = fill;

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = this.stroke;
        c.fillStyle = this.fill;
        c.stroke();
        c.fill();
      }

      this.inside = function(width, height) {
        if(this.x + this.radius + 1 > width)
          return false;
        if(this.y + this.radius + 1 > height)
          return false;
        if(this.y - (this.radius + 1) < 0)
          return false;
        if(this.x - (this.radius + 1) < 0)
          return false;
        return true;
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
        let distance = Math.sqrt((mouse.x-this.x)*(mouse.x-this.x)+(mouse.y-this.y)*(mouse.y-this.y))
        if(distance < this.radius && this.inside(width, height)) {
          this.radius += 1;
        }

        this.draw();
      }
    }

    let randoRgbaTemplate = function() {
      let r = Math.random() * 255;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      let a = Math.random();
      return `rgba(${r},${g},${b},${a})`;
    }

    //generating randomized circles
    //creates an array that will get spread out in the Circle call below
    let randoC = function(w,h) {
      let out = [];
      let speedMult = 3;
      let r = Math.max(Math.random() * 30, 5);
      out.push(Math.min(Math.max(Math.random() * w, r + 1), w - r));
      out.push(Math.min(Math.max(Math.random() * h, r + 1), h - r));
      out.push((Math.random() - 0.5) * speedMult);
      out.push((Math.random() - 0.5) * speedMult);
      out.push(r);
      out.push(randoRgbaTemplate());
      out.push(randoRgbaTemplate());

      return out;
    }

    let circleArray = [];
    for(let i = 0; i < 100; i++) {
      circleArray.push(new Circle(...randoC(width,height)));
    }

    //our actual animate loop
    const animate = function() {
      requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      for(let circle of circleArray) {
        circle.update(); 
      }

    }
    animate();
  }

  trailCircles() {
    const c = this.canvasTarget.getContext("2d");
    let width = this.canvasTarget.width;
    let height = this.canvasTarget.height;
    let rect = this.canvasTarget.getBoundingClientRect();
    //mouse tracking and adjustment to canvas coords
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

    //Circle Object manages itself entirely with calls to update()
    function Circle(x, y, dx, dy, radius, stroke, fill) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.stroke = stroke;
      this.fill = fill;

      this.blank = function() {
        this.radius = 0;
        this.stroke = "";
        this.fill = "";
        this.lifetime = -1;
        this.dx = 0;
        this.dy = 0;
      }

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = this.stroke;
        c.fillStyle = this.fill;
        c.stroke();
        c.fill();
      }

      this.update = function(time) {
        //wall bounces
        if(this.x + this.radius > width || this.x - this.radius < 0)
          this.dx = -this.dx;
        if(this.y + this.radius > height || this.y - this.radius < 0)
          this.dy = -Math.max(1,this.dy * .8);

        if(time % 2 == 0) {
          this.dy++;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    let randoRgbaTemplate = function() {
      let r = Math.random() * 100;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      let a = Math.random();
      return `rgba(${r},${g},${b},${a})`;
    }

    //generating randomized circles
    //creates an array that will get spread out in the Circle call below
    let randoC = function() {
      let out = [];
      let speedMult = 3;
      let r = Math.max(Math.random() * 20, 5);
      out.push(mouse.x);
      out.push(mouse.y);
      out.push((Math.random() - 0.5) * speedMult);
      out.push((Math.random() - 0.5) * speedMult);
      out.push(r);
      out.push(randoRgbaTemplate());
      out.push(randoRgbaTemplate());

      return out;
    }

    let time = 0;
    let frequency = 20;
    let circleArray = [];

    canvas.addEventListener("mouseover", () => {
      console.log("mouseover");
      circleArray.push(new Circle(...randoC()));
    })

    //our actual animate loop
    const animate = function() {
      requestAnimationFrame(animate);
      c.clearRect(0,0,width,height);

      time < 5 ? time++ : time = 0;

      if(time == 3 && mouse.x > 0 && mouse.y > 0) {
        circleArray.push(new Circle(...randoC()));
        if(circleArray.length > 20) circleArray.shift();
      }
      

      for(let circle of circleArray) {  
        circle.update(time); 
      }
    }
    animate();


  }

}