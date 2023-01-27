import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 
    "canvas" 
    ]

  connect() {
    this.canvasTarget.width = Math.floor(window.innerWidth * .92);
    this.canvasTarget.height = Math.floor(window.innerHeight * .7);
  }

  

  driver() {
    const ctx = this.canvasTarget.getContext("2d");
    function Shape(stroke, width, fill, args) {
      this.stroke = stroke;
      this.width = width;
      this.fill = fill;
      this.coords = args

      this.newstroke = function(strokeset) {
        this.stroke = strokeset;
      }

      this.newpath = function(pathset) {
        this.path = pathset;
      }

      this.pushCoord = function(x,y) {
        this.coords.push([x,y]);
      }

      this.path = function() {

        ctx.moveTo(this.coords[0][0], this.coords[0][1]);
        for(let i = 1; i < this.coords.length; i++) {
          ctx.lineTo(this.coords[i][0],this.coords[i][1]);
        }

        if(this.stroke != -1) {
          ctx.lineWidth = this.width;
          ctx.strokeStyle = this.stroke;
          ctx.stroke();
        }
        if(this.fill != -1) {
          ctx.fillStyle = this.fill;
          ctx.fill();
        }
      }
    }

    let points = [[100,100],[200,200],[50,200],[100,100],[200,200]];
    let first = new Shape("#ef4444",5,-1,points);
    first.path();

  }

  clear() {
    let ctx = this.canvasTarget.getContext("2d");
    ctx.beginPath();
    ctx.clearRect(0,0,this.canvasTarget.width,this.canvasTarget.height);
  }


}