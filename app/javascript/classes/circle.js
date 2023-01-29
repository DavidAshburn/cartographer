export class Circle {

  constructor(x,y,radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.held = false;
      this.xoffset = 0;
      this.yoffset = 0;
    }

  hold() {
    this.held = true;
  }
  drop() {
    this.held = false;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.strokeStyle = "#dd5512";
    c.fillStyle = "#efa395";
    c.stroke();
    c.fill();
  }

  update(x,y,c) {
    if(this.held && x > 0 && y > 0) {
      this.x = this.clamp(x - this.xoffset,this.radius,canvas.width - this.radius);
      this.y = this.clamp(y - this.yoffset,this.radius,canvas.height - this.radius);
    }
    this.draw(c);
  }

  inside(x,y) {
    // interactivity
    let distance = Math.sqrt((x-this.x)*(x-this.x)+(y-this.y)*(y-this.y))
    if(distance < this.radius)
      return true;
    return false;
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val,min),max);
  }
}