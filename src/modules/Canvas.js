class Canvas {
    constructor({ id, WIN, width = 700, height = 700 }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
    }

    xs (x) {
        return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
    }

    ys (y) {
        return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT);
    }

    xsPolygon (x) {
        return this.canvas.width * x / this.WIN.WIDTH + this.canvas.width / 2;
    }

    ysPolygon (y) {
        return this.canvas.height - (this.canvas.height * y / this.WIN.HEIGHT) - this.canvas.height / 2;
    }

    sx (x) {
        return x * this.WIN.WIDTH / this.canvas.width;
    }

    sy (y) {
        return -y * this.WIN.HEIGHT / this.canvas.height;
    }

    transparentClear () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle ="transparent";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    clear() {
        this.context.fillStyle = "#eee";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line (x1, y1, x2, y2, colour = 'red', width = 2, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = colour;
        this.context.lineWidth = width;
        this.context.setLineDash([isDash ? isDash : '']);
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    text (text, x, y, colour = 'black', font) {
        this.context.fillStyle = colour;
        this.context.font = font || 'italic 15px Arial';
        this.context.fillText(text, this.xs(x), this.ys(y));
    }

    point (x, y, colour = 'black', size = 2) {
        this.context.beginPath();
        this.context.strokeStyle = colour;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.stroke();
    }

    polygon(points, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(this.xsPolygon(points[0].x), this.ysPolygon(points[0].y));
        for(let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xsPolygon(points[i].x), this.ysPolygon(points[i].y));
        }
        this.context.lineTo(this.xsPolygon(points[0].x), this.ysPolygon(points[0].y));
        this.context.closePath();
        this.context.fill();
    }
    
    integrall(points, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for(let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.context.closePath();
        this.context.fill();
    }
}

export default Canvas;