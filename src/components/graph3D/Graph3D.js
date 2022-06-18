import React from "react";
import "react-dom"
import Canvas from "../../modules/Canvas";
import Math3D from "../../modules/Math/Math3D";

import Light from "./Entities/Light";
import Point from "./Entities/Point";

import {cone, cube, doubleHyperboloid, ellipsoid, ellipticalCylinder, ellipticalParaboloid, hyperbolicCylinder, hyperbolicParaboloid, parabolicCylinder, pyramid,
singleHyperboloid, sphere, tor} from './figures' 

import './graph3D.css';
import './canvas3D.css';

class Graph3D extends React.Component {
    constructor(props) {
        super(props);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            P1: new Point(-10, 10, 350), // upper-left corener
            P2: new Point(-10, -10, 350), // lower-left corener
            P3: new Point(10, -10, 350), // lower-right corener
            CAMERA: new Point(0, 0, 350),
            DISPLAY: new Point(0, 0, 270)
        }

        
        this.isPointsAllow = false;
        this.isEdgesAllow = false;
        this.isPolygonsAllow = true;
        this.lightAllow = true;
        this.sideLightAllow = false;
        this.isAnimationAllow = false;

        this.dx = 0;
        this.dy = 0;
        this.canMove = false;

        const Sun = sphere(20, 40, new Point, '#ffbc1a', [
            { // Self Rotate
                method: 'rotateOx',
                value: -Math.PI / 360
            }
        ]);
        const Mercury = sphere(1, 20, new Point(25, 0, 0), '#7b6036', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 270
            }, { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 90,
                center: new Point,
            },
        ]);
        const Venus = sphere(1.2, 20, new Point(30, 0, 0), '#c7a555', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 300
            }, { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 120,
                center: new Point,
            },
        ]);
        const Earth = sphere(3, 20, new Point(-45, 0, 0), '#00c1ff', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 360,
            }, 
            { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 180,
                center: new Point,
                moveJoined: true
            },
        ]);
        const Moon = sphere(0.5, 20, new Point(-53, 0, 0), '#ff0000', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 360
            }, 
            { // Earth Rotate
                method: 'rotateOx',
                value: Math.PI / 180,
                center: Earth.center
            }
        ]);
        const Mars = sphere(2, 20, new Point(-55, 0, 0), '#ff0000', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 390
            }, { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 210,
                center: new Point,
            },
        ]);
        const Jupiter = sphere(10, 40, new Point(75, 0, 0), '#e1dab8', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 430
            }, { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 360,
                center: new Point,
            },
        ]);
        const Saturn = sphere(9, 40, new Point(-90, 0, 0), '#b59e68', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 430
            }, { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 450,
                center: new Point,
            },
        ]);
        const Uranus = sphere(6, 30, new Point(120, 0, 0), '#2688f5', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 470
            }, { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 510,
                center: new Point,
            },
        ]);
        const Neptune = sphere(5, 30, new Point(-170, 0, 0), '#5bebed', [
            { // Self Rotate
                method: 'rotateOx',
                value: Math.PI / 510
            }, { // Center Rotate
                method: 'rotateOx',
                value: Math.PI / 650,
                center: new Point,
            },
        ]);

        this.solarSystem = [Sun, Earth, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune];

        this.figure = {
            cube:  cube(),
            cone:  cone(),
            doubleHyperboloid:  doubleHyperboloid(),
            ellipsoid:  ellipsoid(),
            ellipticalCylinder:  ellipticalCylinder(),
            ellipticalParaboloid:  ellipticalParaboloid(),
            hyperbolicCylinder: hyperbolicCylinder(),
            hyperbolicParaboloid: hyperbolicParaboloid(),
            parabolicCylinder: parabolicCylinder(),
            pyramid: pyramid(),
            singleHyperboloid: singleHyperboloid(),
            sphere: sphere(),
            tor: tor()
        }

        this.figures = [this.figure.cube];

        this.animations = [
            {//Sun
                root: Sun,
                nodes: [
                    {// Mercury
                        root: Mercury
                    }, {//Venus
                        root: Venus
                    }, {//Earth
                        root: Earth,
                        nodes: [
                            {root: Moon}
                        ]
                    }, {// Mars
                        root: Mars
                    }, {//Jupiter
                        root: Jupiter
                    }, {//Saturn
                        root: Saturn
                    }, {// Uranus
                        root: Uranus
                    }, {//Neptune
                        root: Neptune
                    }
                ]
            }
        ];
    }

    // requestAnimFrame = (() => {
    //     return window.requestAnimationFrame ||
    //         window.webkitRequestAnimationFrame ||
    //         window.mozRequestAnimationFrame ||
    //         window.oRequestAnimationFrame ||
    //         window.msRequestAnimationFrame ||
    //         function (callback) {
    //             window.setTimeout(callback, 1000 / 60);
    //         };
    // })();


    componentDidMount() {
        this.canvas = new Canvas({
            id: 'graph3DCanvas',
            WIN: this.WIN,
        });

        this.math = new Math3D({
            WIN: this.WIN,
        });

        this.LIGHT = new Light(-70, 2, 0, 300000);
        this.SUNLIGHT = new Light(0, 0, 0, 300000);

        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now();

        const animLoop = () => {
            // calc fps
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            // print scene
            if (this.isAnimationAllow) {
                this.figuresAnimantion(this.animations);
            }
            // this.math.calcPlane();
            // this.math.calcWindowVectors();
            this.run(this.figures);
            //this.requestAnimFrame(animLoop);
        }
        animLoop();
        this.run(this.figures);
    }

    //Animations
    figureAnimantion(figure, parentMatrix = this.math.one()) {
        //General Matrix
        const matrix = figure.animations.reduce((accumulator, anime) => {
            const center = anime.center || figure.center;
            const { x, y, z } = center;
            const matrix = [
                this.math.move({ x, y, z }),
                this.math[anime.method](anime.value),
                this.math.move({ x: -x, y: -y, z: -z })
            ].reduce(
                (S, matrix) => this.math.multMatrix(S, matrix),
                this.math.one()
            );
            return this.math.multMatrix(accumulator, matrix);
        }, parentMatrix);
        // Inherited Matrix
        const InheritedMatrix = figure.animations.reduce((accumulator, anime) => {
            const center = anime.center || figure.center;
            const { x, y, z } = center;
            if(anime.moveJoined) {
                var matrix =  [
                    this.math.move({ x, y, z }),
                    this.math[anime.method](anime.value),
                    this.math.move({ x: -x, y: -y, z: -z })
                ].reduce(
                    (S, matrix) => this.math.multMatrix(S, matrix),
                    this.math.one()
                );
            } else {
                matrix = this.math.one();
            }
            return this.math.multMatrix(accumulator, matrix);
        }, parentMatrix);

        //Transform current figure
        this.math.transform(matrix, figure.center);
        figure.points.forEach(point => this.math.transform(matrix, point));
        return InheritedMatrix;
    }
 
    figuresAnimantion(animations, parentMatrix = this.math.one()) {
        animations.forEach(anime => {
            const matrix = this.figureAnimantion(anime.root, parentMatrix);
            if(anime.nodes) {
                this.figuresAnimantion(anime.nodes, matrix); 
            }
        });
    }

    //UserActions
    transformCamera(matrix) {
        this.math.transform(matrix, this.WIN.CAMERA);
        this.math.transform(matrix, this.WIN.DISPLAY);
        this.math.transform(matrix, this.WIN.P1);
        this.math.transform(matrix, this.WIN.P2);
        this.math.transform(matrix, this.WIN.P3);
        this.run(this.figures)
    }

    keyDownHandler(e) {
        //console.log(event.keyCode)
        switch (e.keyCode) {
            case 65: // key a
                return this.transformCamera(this.math.rotateOx(Math.PI / 180));
            case 68: // key d
                return this.transformCamera(this.math.rotateOx(-Math.PI / 180));
            case 83: // key s
                return this.transformCamera(this.math.rotateOy(Math.PI / 180));
            case 87: // key w
                return this.transformCamera(this.math.rotateOy(-Math.PI / 180));
            case 81: // key q
                return this.transformCamera(this.math.rotateOz(Math.PI / 180));
            case 69: // key e
                return this.transformCamera(this.math.rotateOz(-Math.PI / 180));
            case 39: // right arrow
                return this.transformCamera(this.math.move({x: 1, y: 0, z: 0}));
            case 37: // left arrow
                return this.transformCamera(this.math.move({x: -1, y: 0, z: 0}));
            case 38: // up arrow
                return this.transformCamera(this.math.move({x: 0, y: 1, z: 0}));
            case 40: //down arrow
                return this.transformCamera(this.math.move({x: 0, y: -1, z: 0}));
            }
    }

    wheel(e) {
        const delta = (e.nativeEvent.wheelDeltaY > 0) ? -0.02 : 0.02;
        this.transformCamera(this.math.move({
            x: this.WIN.CAMERA.x * delta,
            y: this.WIN.CAMERA.y * delta, 
            z: this.WIN.CAMERA.z * delta
        }));
        this.run(this.figures)
    }

    selectFigure() {
        const selectBox = document.getElementById('figures');
        if(selectBox.options[selectBox.selectedIndex].text === 'solarSystem') {
            this.figures = this.solarSystem;
        } else {
            this.figures = [this.figure[selectBox.options[selectBox.selectedIndex].text]];
        }
        this.run(this.figures)
    }

    selectColor() {
        this.figures.forEach(figure => {
            figure.polygons.forEach(polygon => {
                polygon.colour = polygon.hexToRgb(document.getElementById('colorSelector').value);
            });
        });
        this.run(this.figures)
    }

    powerOfLight() {
        this.SUNLIGHT.lumen = document.getElementById('powerOfLight').value;
        this.LIGHT.lumen = document.getElementById('powerOfLight').value;
        this.run(this.figures);
    }
    
    run(figures) {
        this.math.calcPlane();
        this.math.calcWindowVectors();
        this.canvas.clear();
        //polygons
        if(this.isPolygonsAllow) {
            const polygons = [];
            figures.forEach((figure, index) => {
                this.math.clacDisctance(figure, this.WIN.CAMERA, 'distance');
                this.math.clacDisctance(figure, this.SUNLIGHT, 'lumen');
                this.math.clacDisctance(figure, this.LIGHT, 'sideLimen');
                this.math.normVector(figure);
                figure.polygons.forEach(polygon => {
                    polygon.figureIndex = index;
                    polygons.push(polygon);
                });
            });
            this.math.sortByArtistAlgorithm(polygons);
            polygons.forEach(polygon => {
                const figure = figures[polygon.figureIndex];
                const points = polygon.points.map(point => {
                    return this.math.getProection(figure.points[point]);
                });
                let sunLumen = this.math.clacIlluminationDistance(polygon.lumen, this.SUNLIGHT.lumen);
                let sideLumen = this.math.clacIlluminationDistance(polygon.sideLimen, this.LIGHT.lumen);
                if (!this.lightAllow) {
                    sunLumen = 0;
                }
                if (!this.sideLightAllow) {
                    sideLumen = 0;
                }
                let { r, g, b } = polygon.colour;
                r = Math.round(r * (sunLumen + sideLumen));
                g = Math.round(g * (sunLumen + sideLumen));
                b = Math.round(b * (sunLumen + sideLumen));
                //const angle = this.math.calcCorner(polygon.norm, this.WIN.CAMERA);
                //if ((Math.acos(angle) >= 0 && Math.acos(angle) <= Math.PI / 2)) {
                this.canvas.polygon(points, polygon.rgbToHex(r, g, b));
                //}
                if (figure.name === 'hyperbolicParaboloid' || figure.name === 'parabolicCylinder' || figure.name === 'hyperbolicCylinder' || figure.name === 'cone') {
                    this.canvas.polygon(points, polygon.rgbToHex(r, g, b));
                }
            });
        }
        //edges
        if(this.isEdgesAllow) {
            figures.forEach(figure => {
                figure.edges.forEach(edge => {
                    const point1 = this.math.getProection(figure.points[edge.p1]);
                    const point2 = this.math.getProection(figure.points[edge.p2]);
                    this.canvas.line(
                        point1.x,
                        point1.y,
                        point2.x,
                        point2.y,
                        'black', 1
                    );
                });
            });
        }
        //points
        if(this.isPointsAllow) {
            figures.forEach(figure => {
                figure.points.forEach(point => {
                    const proectionPoint = this.math.getProection(point);
                    this.canvas.point(proectionPoint.x, proectionPoint.y);
                });
            });
        }
    }

    render() {
        return (
            <div className = "graph3D">
                <div>
                    <div>
                    <button onClick = {() => this.lightAllow = !this.lightAllow}>Light</button>
                    <button onClick = {() => this.sideLightAllow = !this.sideLightAllow}>Side Light</button>
                    <button onClick = {() => this.isAnimationAllow = !this.isAnimationAllow}>Animation</button>
                    </div>
                    <input
                        onChange = {() => this.powerOfLight()}
                        id = "powerOfLight"
                        type = "range"
                        min = "10000"
                        max = "400000"
                        step = "4000"
                        defaultValue = "10000"
                    ></input>
                    <input   
                        onChange = {() => this.selectColor()}
                        id = "colorSelector"
                        type = "color"
                        value = "#ff00c8"
                    ></input>
                </div>
                <div className = "">
                    <canvas
                        className = "canvas3D"
                        id = "graph3DCanvas"
                        onMouseDown = {() => this.canMove = true}
                        onMouseUp = {() => this.canMove = false}
                        onMouseLeave = {() => this.canMove = false}
                        onWheel = {(e) => this.wheel(e)}
                        onKeyDown = {(e) => this.keyDownHandler(e)}
                        tabIndex = "0"
                    ></canvas>
                </div>
                <div>
                    <select
                        id = "figures"
                        onChange = {() => this.selectFigure()}
                    >
                        <option className = "options">cube</option>
                        <option className = "options">cone</option>
                        <option className = "options">pyramid</option>
                        <option className = "options">sphere</option>
                        <option className = "options">ellipsoid</option>
                        <option className = "options">ellipticalCylinder</option>
                        <option className = "options">ellipticalParaboloid</option>
                        <option className = "options">hyperbolicCylinder</option>
                        <option className = "options">hyperbolicParaboloid</option>
                        <option className = "options">parabolicCylinder</option>
                        <option className = "options">singleHyperboloid</option>
                        <option className = "options">doubleHyperboloid</option>
                        <option className = "options">tor</option>
                        <option className = "options">solarSystem</option>
                    </select>
                </div>
                <div>
                    <button onClick = {() => {this.isPointsAllow = !this.isPointsAllow; this.run(this.figures)}}>Points</button>
                    <button onClick = {() => {this.isEdgesAllow = !this.isEdgesAllow; this.run(this.figures)}}>Edges</button>
                    <button onClick = {() => {this.isPolygonsAllow = !this.isPolygonsAllow; this.run(this.figures)}}>Polygons</button>
                </div>
            </div>
        );
    }
}

export default Graph3D;