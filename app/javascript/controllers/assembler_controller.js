import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 
    "canvas" 
    ]

  connect() {
    this.canvasTarget.width = window.innerWidth;
    this.canvasTarget.height = Math.floor(window.innerHeight * .6);
    this.aniHandle;
  }

  clear() {
    let c = this.canvasTarget.getContext("2d");
    c.beginPath();
    c.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);
  }

  driver() {
    let c = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();
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

    let circleArray = [];


    canvas.addEventListener('mousedown', () => {
      for(let circle of circleArray) {
        if(circle.inside()) {
          circle.hold();
        }
      }
    })
    canvas.addEventListener('mousemove', () => {
      for(let circle of circleArray) {
        if(circle.held) {
          circle.update();
          console.log("hit");
        }
      }
    })
    canvas.addEventListener('mouseup', () => {
      for(let circle of circleArray) {
        circle.drop();
      }
    })
    canvas.addEventListener('mouseout', () => {
      for(let circle of circleArray) {
        circle.drop();
      }
    })
    canvas.addEventListener('mouseenter', () => {
      for(let circle of circleArray) {
        circle.drop();
      }
    })

    function Circle(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.held = false;

      this.hold = function() {
        this.held = true;
      }
      this.drop = function() {
        this.held = false;
      }

      this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.strokeStyle = "#dd5512";
        c.fillStyle = "#efa395";
        c.stroke();
        c.fill();
      }

      this.update = function() {
        if(this.held && mouse.x > 0 && mouse.y > 0) {
          this.x = mouse.x;
          this.y = mouse.y;
        }
        this.draw();
      }

      this.inside = function() {
        // interactivity
        let distance = Math.sqrt((mouse.x-this.x)*(mouse.x-this.x)+(mouse.y-this.y)*(mouse.y-this.y))
        if(distance < this.radius)
          return true;
        return false;
      }
    }

    circleArray.push(new Circle(100,100,50));
    for(let item of circleArray) {
      item.update();
    }

  }
}