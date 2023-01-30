export class Circle {

  constructor(x,y,radius,stroke = this.randomRgba(), fill = this.randomRgba(), line_width = Math.random() * 4) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.held = false;
      this.xoffset = 0;
      this.yoffset = 0;
      this.stroke = stroke;
      this.fill = fill;
      this.lineWidth = line_width;
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
    c.lineWidth = this.lineWidth;
    c.strokeStyle = this.stroke;
    c.fillStyle = this.fill;
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

  randomRgba() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let a = Math.random();
    return `rgba(${r},${g},${b},${a})`;
  }
}