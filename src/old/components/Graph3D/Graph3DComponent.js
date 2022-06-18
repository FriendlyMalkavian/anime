class Graph3DComponent extends Component {
    constructor(options) {
        super(options);

        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, 50),
            DISPLAY: new Point(0, 0, 30)
        }

        this.LIGHT = new Light(-45, 2, 0, document.getElementById('powerOfLight').value);
        this.SUNLIGHT = new Light(0, 0, 0, 30000);
        
        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'canvas3D',
            callbacks: {
                wheel: event => this.wheel(event),
                mouseMove: event => this.mouseMove(event),
                mouseDown: event => this.mouseDown(event),
                mouseUp: () => this.mouseUp(),
                mouseLeave: () => this.mouseLeave()
            }
        });

        this.graph3D = new Graph3D({
            WIN: this.WIN
        });

        this.isPointsAllow = true;
        this.isEdgesAllow = true;
        this.isPolygonsAllow = true;
        this.isLightSpinningAllow = false;
        this.isAnimationAllow = false;
        this.roundLight = false;
        this.sunLight = true;

        this.figureNumber = 0;
        this.dx = 0;
        this.dy = 0;
        this.canMove = false;
        this.figures = [(new Figure).sphere(10, 20, 0, 0, 0, '#ffbb00'), (new Figure).sphere(2, 10, 20, 2, 0)];
        this.figureAnimantion();
        this.lightSpinning();
        this.render();
    }

    _addEventListeners() {
        document.addEventListener('keydown', event => this.keyDownHandler(event));
        document.getElementById('addFigure').addEventListener('click', () => { this.figures.push((new Figure).sphere()); this.render() });
        document.getElementById('deleteFigure').addEventListener('click', () => { if(this.figureNumber > 0){this.figures.pop();} this.render() });
        //checkboxes
        document.getElementById('isPoints').addEventListener('click', () => this.check('isPointsAllow'));
        document.getElementById('isEdges').addEventListener('click', () => this.check('isEdgesAllow'));
        document.getElementById('isPolygons').addEventListener('click', () => this.check('isPolygonsAllow'));
        document.getElementById('lightSpinning').addEventListener('click', () => this.check('isLightSpinningAllow'));
        document.getElementById('animation').addEventListener('click', () => this.check('isAnimationAllow'))
        //selectors
        document.getElementById('figures').addEventListener('change', () => this.selectFigure());
        document.getElementById('colorSelector').addEventListener('input', () => this.selectColor());
        document.getElementById('powerOfLight').addEventListener('input', () => this.powerOfLight());
        document.getElementById('arrow-right').addEventListener('click', () => this.changeFigure('plus'));
        document.getElementById('arrow-left').addEventListener('click', () => this.changeFigure('minus'));
    }

    changeFigure(sign) {
        if(sign == 'minus') {
            this.figureNumber > 0 ? this.figureNumber-- : null;
        } else {
            this.figureNumber < this.figures.length - 1 ? this.figureNumber++ : null;
        }
        document.querySelectorAll('.option').forEach(option => {
            if (option.hasAttribute('selected')) {option.removeAttribute('selected');}
            if (this.figures[this.figureNumber].name == option.text) {
                option.setAttribute('selected', 'selected');
            }
        });
    }

    

    selectFigure() {
        const selectBox = document.getElementById('figures');
        this.figures[this.figureNumber] = (new Figure)[selectBox.options[selectBox.selectedIndex].text]();
        this.render();
    }



    figureAnimantion() {
        const gradus = -Math.PI / 720;
        setInterval(() => {
            if (this.isAnimationAllow) {
                const matrix = this.graph3D.rotateOx(gradus);
                this.figures.forEach(figure => {
                    figure.points.forEach(point => {
                        this.graph3D.transform(matrix, point);
                    });
                });
                this.render();
            }
        }, 15)
        const Sun = (new Figure).sphere(20, 40, new Point, "yellow", [
            {
                method: 'rotateOz',
                value: Math.Pi/360,
            }
        ]);
        const Earth = (new Figure).sphere(10, 40, new Point(-40, 0, 0), "blue", [
            {
                method: 'rotateOz',
                value: Math.Pi/360,
            }, 
            {
                method: 'rotateOz',
                value: Math.Pi/180,
                canter: new Point
            }
        ]);
        const Moon = (new Figure).sphere(5, 20, new Point(-60, 0, 0), "grey", [
            {
                method: 'rotateOz',
                value: Math.Pi/360,
            }, 
            {
                method: 'rotateOz',
                value: Math.Pi/180,
                canter: new Point
            },
            {
                method: 'rotateOz',
                value: Math.Pi/90,
                canter: Earth.center 
            }
        ]);
        this.Figures = [Sun, Earth, Moon];
        let FPS = 0;
        let lastTimestamp = Date.now();
    }

    lightSpinning() {
        let i = -Math.PI / 2;
        setInterval(() => {
            if (this.isLightSpinningAllow) {
                this.LIGHT.x = 45 * Math.sin(i);
                this.LIGHT.z = 45 * Math.cos(i);
                i += Math.PI / 48;
                this.render();
                i = (i > 2 * Math.PI) ? 0 : i;
            }
        }, 75)
    }

    selectColor() {
        this.figures.forEach(figure => {
            figure.polygons.forEach(polygon => {
                polygon.colour = polygon.hexToRgb(document.getElementById('colorSelector').value);
            });
        });
        this.render();
    }

    powerOfLight() {
        this.LIGHT.lumen = document.getElementById('powerOfLight').value;
        this.render();
    }

    check(name) {
        this[name] =! this[name];
        this.render();
    }

    moveFigures(dx, dy, dz) {
        const matrix = this.graph3D.move(dx, dy, dz);
        this.figures[this.figureNumber].points.forEach(point => {
                this.graph3D.transform(matrix, point);
            });
        this.render();
    }

    // Always use keyCode
    keyDownHandler(event) {
        switch (event.keyCode) {
            case 65: // key a
                return this.moveFigures(-1, 0, 0);
            case 68: // key d
                return this.moveFigures(1, 0, 0);
            case 87: // key w
                return this.moveFigures(0, 1, 0);
            case 83: // key s
                return this.moveFigures(0, -1, 0);
        }
    }

    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDeltaY > 0) ? 1.1 : 0.9;
        const matrix = this.graph3D.zoom(delta);
        this.figures.forEach(figure => {
            figure.points.forEach(point => {
                this.graph3D.transform(matrix, point)
            });
        });
        this.render();
    }



    mouseMove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 720;
            const matrixY = this.graph3D.rotateOy((this.dy - event.offsetY) * gradus);
            const matrixX = this.graph3D.rotateOx((this.dx - event.offsetX) * gradus);
            this.figures.forEach(figure => {
                figure.points.forEach(point => {
                    this.graph3D.transform(matrixY, point);
                    this.graph3D.transform(matrixX, point);
                });
            });
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.render();
        }
    }

    mouseDown(event) {
        this.canMove = true;
        this.dx = event.offsetX
        this.dy = event.offsetY
    }

    mouseLeave() {
        this.canMove = false;
    }

    mouseUp() {
        this.canMove = false;
    }

    render() {
        this.canvas.clear();
        //polygon
        if (this.isPolygonsAllow) {
            const polygons = [];
            this.figures.forEach((figure, index) => {
                this.graph3D.clacDisctance(figure, this.WIN.CAMERA, 'distance');
                this.graph3D.clacDisctance(figure, this.LIGHT, 'lumen');
                this.graph3D.normVector(figure);
                figure.polygons.forEach(polygon => {
                    polygon.figureIndex = index;
                    polygons.push(polygon);
                });
            });
            this.graph3D.sortByArtistAlgorithm(polygons);
            polygons.forEach(polygon => {
                const figure = this.figures[polygon.figureIndex];
                const points = polygon.points.map(point => {
                    return {
                        x : this.graph3D.xs(figure.points[point]),
                        y : this.graph3D.ys(figure.points[point])
                    }
                });
                const lumen = this.graph3D.clacIlluminationDistance(polygon.lumen, this.LIGHT.lumen);
                let {r, g, b} = polygon.colour;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.canvas.polygon(points, polygon.rgbToHex(r, g, b));
                // if(Math.cos(
                //         (polygon.norm.x * this.WIN.CAMERA.x + polygon.norm.y * this.WIN.CAMERA.y + polygon.norm.z * this.WIN.CAMERA.z) /
                //         Math.sqrt(Math.pow(polygon.norm.x, 2) + Math.pow(polygon.norm.y, 2) + Math.pow(polygon.norm.z, 2)) * 
                //         Math.sqrt(Math.pow(this.WIN.CAMERA.x, 2) + Math.pow(this.WIN.CAMERA.y, 2) + Math.pow(this.WIN.CAMERA.z, 2))
                //     ) <= 0
                // ) {this.canvas.polygon(points, polygon.rgbToHex(r, g, b));}
                // this.canvas.point(this.graph3D.xs(polygon.norm), this.graph3D.ys(polygon.norm));
                // this.canvas.line(this.graph3D.xs(new Point(0 , 0, 0)), this.graph3D.xs(new Point(0 , 0, 0)), this.graph3D.xs(polygon.norm), this.graph3D.ys(polygon.norm));
            });
        }
        //edges
        if (this.isEdgesAllow) {
            this.figures.forEach(figure => {
                figure.edges.forEach(edge => {
                    const point1 = figure.points[edge.p1];
                    const point2 = figure.points[edge.p2];
                    this.canvas.line(
                        this.graph3D.xs(point1),
                        this.graph3D.ys(point1),
                        this.graph3D.xs(point2),
                        this.graph3D.ys(point2),
                        'black', 1
                    );
                });
            });
        }
        //points
        if (this.isPointsAllow) {
            this.figures.forEach(figure => {
                figure.points.forEach(point => {
                    this.canvas.point(this.graph3D.xs(point), this.graph3D.ys(point));
                });
            });
        }
    }
}

//join записать отдельно от фигур