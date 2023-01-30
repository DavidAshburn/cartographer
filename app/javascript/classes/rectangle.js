export class Rectangle {

  constructor(x,y,width,height,stroke = "#dd5512",fill = "#efa395") {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.held = false;
      this.xoffset = 0;
      this.yoffset = 0;
      this.stroke = stroke;
      this.fill = fill;
    }

  hold() {
    this.held = true;
  }
  drop() {
    this.held = false;
  }

  draw(c) {
    c.beginPath();
    c.strokeStyle = this.stroke;
    c.fillStyle = this.fill;
    c.strokeRect(this.x,this.y,this.width,this.height);
    c.fillRect(this.x,this.y,this.width,this.height);
    c.stroke();
    c.fill();
  }

  update(x,y,c) {
    if(this.held && x > 0 && y > 0) {
      this.x = this.clamp(x - this.xoffset,this.width / 2,canvas.width - this.width / 2);
      this.y = this.clamp(y - this.yoffset,this.height / 2,canvas.height - this.height / 2);
    }
    this.draw(c);
  }

  inside(x,y) {
    if(x < this.x || x > this.x + this.width)
      return false;
    if(y < this.y || y > this.y + this.height)
      return false;
    return true;
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val,min),max);
  }

}