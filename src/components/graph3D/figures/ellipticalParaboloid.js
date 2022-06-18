import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';
import FigureAnimation from '../Entities/FigureAnimation';

function ellipticalParaboloid (x = 7, y = 10, count = 20, color = '#121212') {
    const edges = [];
    const points = [];
    const polygons = [];
    const delta = 2 * Math.PI / count;

    //points
    for(let i = -(Math.PI); i < Math.PI; i += delta) {
        for(let j = -(Math.PI); j < Math.PI; j += delta) {
            points.push(new Point(
                i * Math.sqrt(y) * Math.cos(j),
                0.5 * Math.pow(i, 2),
                i * Math.sqrt(x) * Math.sin(j)
            ));
        }
    }

    //edges
    for(let i = 0; i < points.length; i++) {
        if(points[i + 1]) {
            if((i + 1) % count === 0) {
                if(points[i - count]) {
                    edges.push(new Edge(i, i - count));
                }
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        if(points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }
    edges.push(new Edge(0, count - 1));

    //polygons
    for (let i = 0; i < points.length; i++) {
        if ((i/count)%2 < 1) {
            if (i%2==0) {
                color = "#00000"
            }
            else {
                color = "#0000"
            }
        }
        else {
            if (i%2!=0) {
                color = "#41be80"
            }
            else {
                color = "#00000"
            }
        }
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
        }
    }
    

    //animation
    const animation = [
        new FigureAnimation('rotateOy' , Math.PI / 180),
        new FigureAnimation('rotateOx', Math.PI / 180),
        new FigureAnimation('rotateOz', Math.PI / 180),
    ];

    return new Subject(points, edges, polygons, 'ellipticalParaboloid', animation);
}

export default ellipticalParaboloid;