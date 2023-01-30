export class Shape {

  constructor(x,y,line_width=2,stroke=false,fill=false,held=false) {
      this.x = x;
      this.y = y;
      this.xoffset = 0;
      this.yoffset = 0;
      this.line_width = line_width;

      if(!stroke)
        this.stroke = this.randomRgba();
      else
        this.stroke = stroke;

      if(!fill)
        this.fill = this.randomRgba();
      else 
        this.fill = fill;

      this.held = held;
    }

  hold() {
    this.held = true;
  }

  drop() {
    this.held = false;
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

export class Rectangle extends Shape {

  constructor(x,y,width,height,line_width,stroke,fill,held) {
      super(x,y,line_width,stroke,fill,held);

      this.xoffset = 0;
      this.yoffset = 0;
      this.width = width;
      this.height = height;
    }

  draw(c) {
    c.beginPath();
    c.strokeStyle = this.stroke;
    c.fillStyle = this.fill;
    c.lineWidth = this.line_width;
    c.strokeRect(this.x,this.y,this.width,this.height);
    c.fillRect(this.x,this.y,this.width,this.height);
    c.stroke();
    c.fill();
  }

  update(x,y,c) {
    if(this.held && x > 0 && y > 0) {
      this.x = this.clamp(x - this.xoffset,1,canvas.width - this.width);
      this.y = this.clamp(y - this.yoffset,1,canvas.height - this.height);
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
}

export class Circle extends Shape {

  constructor(x,y,radius,line_width,stroke,fill,held) {
      super(x,y,line_width,stroke,fill,held);

      this.xoffset = 0;
      this.yoffset = 0;
      this.radius = radius;
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
}

export class Triangle extends Shape {

  constructor(x,y,width,height,line_width,stroke,fill,held) {
    super(x,y,line_width,stroke,fill,held);

    this.width = width;
    this.height = height;
    this.xoffset = 0;
    this.yoffset = 0;
  }

  draw(c) {
    c.beginPath();
    c.moveTo(this.x,this.y)
    c.lineTo(this.x+this.width/2,this.y-this.height);
    c.lineTo(this.x+this.width,this.y);
    c.stroke();
    c.fill();
  }

  update(x,y,c) {
    if(this.held && x > 0 && y > 0) {
      this.x = this.clamp(x - this.xoffset,1,canvas.width - this.width);
      this.y = this.clamp(y - this.yoffset,1 + this.height,canvas.height - 1);
    }
    this.draw(c);
  }

  inside(x,y) {
    if(x < this.x || x > this.x + this.width) {
      console.log("xfail");
      return false;
    }
    if(y > this.y || y < this.y - this.height) {
      console.log("yfail");
      return false;
    }
    let mx = x - this.x - (this.width / 2);
    let my = this.y - y;

    console.log(`${mx}, ${my}, ${x}, ${y}`);

    if (Math.abs(mx) * 2 <= my) return true;
    console.log("oops");
    return false;
  }
}