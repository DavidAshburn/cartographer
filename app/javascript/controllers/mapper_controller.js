import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ 
  "canvas" 
  ]

  connect() {
  }

  drawLine() {
    let c = this.canvasTarget.getContext("2d");
    c.moveTo(0, 0);
    c.lineTo(200, 100);
    c.stroke();
  }

}