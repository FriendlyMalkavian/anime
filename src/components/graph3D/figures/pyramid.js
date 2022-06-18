import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';
import FigureAnimation from '../Entities/FigureAnimation';

function pyramid (count = 6) {
    const edges = [];
    const points = [new Point(0, 10, 0)];
    const polygons = [];
    const basePolygons = [];

    //points
    const y = -10;
    const delta = (2 * Math.PI) / count;
    for(let i = 0; i < 2 * Math.PI; i += delta) {
        points.push(new Point(
            10 * Math.cos(i),
            y,
            10 * Math.sin(i)
        ));
    }

    //edges
    for(let i = 0; i < points.length; i++) {
        if(points[i + 1]) {
            edges.push(new Edge(0, i + 1))
            edges.push(new Edge(i, i + 1))
            edges.push(new Edge(points.length - 1, 1))
        }
    }

    //polygons
    for(let i = 0; i < points.length; i++) {
        if(points[i + 1]) {
            polygons.push(new Polygon([i+ 1, i, 0]));
        }
    }
    for(let i = 1; i <= count; i++) { basePolygons.push(i) }
    polygons.push(new Polygon(basePolygons));

    //animation
    const animation = [
        new FigureAnimation('rotateOy' , Math.PI / 180),
        new FigureAnimation('rotateOx', Math.PI / 180),
        new FigureAnimation('rotateOz', Math.PI / 180),
    ];

    return new Subject(points, edges, polygons, 'pyramid', animation);
}

export default pyramid;