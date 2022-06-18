class Graph2DComponent extends Component {
  constructor(options) {
    super(options);

    this.WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20
    };

    this.canvas = new Canvas({
      WIN: this.WIN, 
      id: 'canvas',
      width: 700, 
      height: 700, 
      callbacks: {
        wheel: event => this.wheel(event),
        mouseMove: event => this.mouseMove(event),
        mouseUp: () => this.mouseUp(),
        mouseDown: () => this.mouseDown(),
        mouseLeave: () => this.mouseLeave()
      }
    });

    this.ui = new UIComponent({
      id: 'ui',
      parent: this.id,
      template: template.uiTemplate,
      callbacks: {
        delFunction: (num) => this.delFunction(num),
        addFunction: (f, num, width, color, sLine, eLine, printDerevative) => this.addFunction(f, num, width, color, sLine, eLine, printDerevative)
      },
    });

    this.mathPart = new MathPart({WIN: this.WIN, canvas: this.canvas});

    this.derevativeX = 0
    this.funcs = [];
    this.canMove = false;
    this.render();
  }

  addFunction(f, num, width = 2, color = 'red', sLine, eLine, printDerevative) {
    this.funcs[num] = {f, color, width, sLine, eLine, printDerevative}
    this.render();
  }

  delFunction (num) {
    this.funcs[num] = null;
    this.render();
  }
    
  mouseMove(event) {
    if (this.canMove) {
      this.WIN.LEFT -= this.canvas.sx(event.movementX);
      this.WIN.BOTTOM -= this.canvas.sy(event.movementY);
    }
    this.derevativeX = this.WIN.LEFT + this.canvas.sx(event.offsetX);
    this.render()
  }
  mouseLeave() {
    this.canMove = false;
  }
  mouseUp() {
    this.canMove = false;
  }
  mouseDown() {
    this.canMove = true;
  }
  wheel(event) {
    event.preventDefault();
    let delta = event.deltaY > 0 ? -0.3: +0.3
    if(this.WIN.BOTTOM + delta < -6) {
      this.WIN.WIDTH -= delta
      this.WIN.HEIGHT -= delta
      this.WIN.LEFT += delta / 2
      this.WIN.BOTTOM += delta / 2
    }
    this.render();
  }

  render () {
    this.canvas.clear();
    this.printXY();
    //Function
    this.funcs.forEach(f => {
      if (f) {
        this.printFunction(f.f, f.color, f.width);
      }      
    });

    //Derivative
    this.funcs.forEach(f => {
      if (f && f.printDerevative) {
        this.mathPart.printTangent(f.f, this.derevativeX);
      }
    })

    //Integral
    this.funcs.forEach(f => {
      if(f) {
        this.printIntegral(f.f, f.sLine - 0, f.eLine - 0)
      }
    })

    //GetZero
    this.funcs.forEach(f => {
      if(f) {
        let xZero = this.mathPart.getZero(f.f, f.sLine - 0, f.eLine - 0, 0.00001);
        if(f.sLine < f.eLine) {
          this.canvas.line(f.sLine, 0, f.eLine, 0, 'orange', 2);
          if(
            xZero != null &&
            xZero >= f.sLine &&
            xZero <= f.eLine
          ) {this.canvas.point(xZero, 0)};
        }
      }
    });
  }

  printFunction (f, color, width) {
    let x = this.WIN.LEFT;
    const dx = this.WIN.WIDTH / 1000;
    while (x < this.WIN.LEFT + this.WIN.WIDTH) {
      this.canvas.line(x, f(x), x + dx, f(x + dx), color, width);
      x += dx;
    }
  }

  printIntegral(f, a, b, n = 100) {
    const dx = (b - a) / n;
    let x = a;
    const points = [];
    points.push({x, y: 0});
    while(x < b) {
      points.push({x, y: f(x)});
      x += dx;
    }
    points.push({x: b, y: 0});
    this.canvas.polygon(points, 'rgba(255, 60, 135, 0.5)');
  }

  printXY () {
    const {LEFT, BOTTOM, WIDTH, HEIGHT} = this.WIN;
    //XY
    this.canvas.line(0, BOTTOM,0, HEIGHT + BOTTOM,'black');
    this.canvas.line(LEFT, 0, WIDTH + LEFT, 0,'black');
    //Arrows
    this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, 0.15,'black', 1.5);
    this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, -0.15,'black', 1.5);
    this.canvas.line(0, HEIGHT + BOTTOM,-0.15, HEIGHT + BOTTOM - 0.4,'black', 1.5);
    this.canvas.line(0, HEIGHT + BOTTOM, 0.15, HEIGHT + BOTTOM - 0.4,'black', 1.5);
    //Text
    this.canvas.text('0', 0.5, -0.7);
    this.canvas.text('1', 1, 1);
    this.canvas.text('-1', -1, -1);
    this.canvas.text('x', WIDTH + LEFT - 0.4, -0.5);
    this.canvas.text('y', 0.5, HEIGHT + BOTTOM - 1);
    //Lines
    for(let i = 0; i < HEIGHT + BOTTOM; i ++) {
        this.canvas.line (-0.2, i, 0.2, i, 'black', 1);
    }
    for(let i = 0; i > BOTTOM; i --) {
        this.canvas.line (-0.2, i, 0.2, i, 'black', 1);
    }
    for(let i = 0; i < WIDTH + LEFT; i ++) {
        this.canvas.line (i, -0.2, i, 0.2, 'black', 1);
    }
    for(let i = 0; i > LEFT; i --) {
        this.canvas.line(i, -0.2, i, 0.2,'black', 1);
    }
    //Net
    for(let i = 0; i > LEFT; i --){
        this.canvas.line (i, BOTTOM + LEFT, i, HEIGHT + BOTTOM,'black', 0.2);
    }
    for(let i = 0; i < HEIGHT + LEFT - BOTTOM + WIDTH; i++) {
        this.canvas.line (i, BOTTOM, i, 0,'black', 0.2);
    }
    for(let i = 0; i < HEIGHT + LEFT + BOTTOM + WIDTH; i++) {
        this.canvas.line (i, 0, i, HEIGHT + BOTTOM,'black', 0.2);
        this.canvas.line (LEFT, i, HEIGHT + LEFT, i, 'black', 0.2);
    }
    for(let i = 0; i > BOTTOM; i --) {
        this.canvas.line (LEFT + BOTTOM, i, WIDTH + LEFT, i, 'black', 0.2);
    }
    for(let i = 0; i < HEIGHT - LEFT + BOTTOM + WIDTH; i ++) {
        this.canvas.line (LEFT, i, 0, i, 'black', 0.2);
    }
  }
}