import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';
import FigureAnimation from '../Entities/FigureAnimation';

function doubleHyperboloid (xz = 3, y = 3, count = 20) {
    const edges = [];
    const points = [];
    const polygons = [];
    const delta = 2 * Math.PI / count;

    //points
    for(let i = -(Math.PI); i < Math.PI; i += delta) {
        for(let j = 0; j < 2 * Math.PI; j += delta) {
            points.push(
                new Point(
                xz * Math.sinh(i) * Math.cos(j),
                -y * Math.cosh(i),
                xz * Math.sinh(i) * Math.sin(j),
            ));
        }
    }
    for(let i = -(Math.PI); i < Math.PI; i += delta) {
        for(let j = 0; j < 2 * Math.PI; j += delta) {
            points.push(
                new Point(
                xz * Math.sinh(i) * Math.cos(j),
                y * Math.cosh(i),
                xz * Math.sinh(i) * Math.sin(j)
                ),
            )
        }
    }

    //edges
    for(let i = 0; i < points.length / 2 - count; i++) {
        if(points[i + 1]) {
            if((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        if(points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }
    for(let i = points.length / 2; i < points.length; i++) {
        if(points[i + 1]) {
            if((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        if(points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }
    edges.push(new Edge(points.length - count, points.length - 1));

    //polygons
    for(let i = 0; i < points.length / 2 - count; i++) {
        if(points[i + count + 1] && (i + 1) % count !== 0) {
            polygons.push(new Polygon(
                [i, i + count, i + count + 1, i + 1]
            ));
        }
    }
    for(let i = points.length / 2; i < points.length; i++) {
        if(points[i + count + 1] && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
        }
    }
    polygons.push(new Polygon([0, count - 1, 2 * count - 1, count]));
    polygons.push(new Polygon([points.length / 2 + count - 1, points.length / 2 + 2 * count - 1, points.length / 2 + count , points.length / 2]));

    //animation
    const animation = [
        new FigureAnimation('rotateOy' , Math.PI / 180),
        new FigureAnimation('rotateOx', Math.PI / 180),
        new FigureAnimation('rotateOz', Math.PI / 180),
    ];
    
    return new Subject(points, edges, polygons, 'doubleHyperboloid', animation);
}

export default doubleHyperboloid;