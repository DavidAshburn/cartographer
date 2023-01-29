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

    let objectArray = [];


    canvas.addEventListener('mousedown', () => {
      for(let object of objectArray) {
        if(object.inside()) {
          object.hold();
          object.xoffset = mouse.x - object.x;
          object.yoffset = mouse.y - object.y;
        }
      }
    })
    canvas.addEventListener('mousemove', () => {
      this.clear();
      for(let object of objectArray) {
        object.update();
      }
    })
    canvas.addEventListener('mouseup', () => {
      for(let object of objectArray) {
        object.drop();
      }
    })
    canvas.addEventListener('mouseout', () => {
      for(let object of objectArray) {
        object.drop();
      }
    })
    canvas.addEventListener('mouseenter', () => {
      for(let object of objectArray) {
        object.drop();
      }
    })

    function Circle(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.held = false;
      this.xoffset = 0;
      this.yoffset = 0;

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
          this.x = mouse.x - this.xoffset;
          this.y = mouse.y - this.yoffset;
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

    objectArray.push(new Circle(100,100,50));
    objectArray.push(new Circle(200,200,20));
    for(let item of objectArray) {
      item.update();
    }

  }
}