import { Controller } from "@hotwired/stimulus"

import { Rectangle, Circle } from "classes/shape"

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
        if(object.inside(mouse.x,mouse.y)) {
          object.hold();
          object.xoffset = mouse.x - object.x;
          object.yoffset = mouse.y - object.y;
        }
      }
    })
    canvas.addEventListener('mousemove', () => {
      this.clear();
      for(let object of objectArray) {
        object.update(mouse.x,mouse.y,c);
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

    objectArray.push(new Circle(100,100,50));
    objectArray.push(new Circle(200,200,20));
    objectArray.push(new Rectangle(300,300,200,100))
    for(let item of objectArray) {
      item.update(mouse.x,mouse.y,c);
    }
  }
}