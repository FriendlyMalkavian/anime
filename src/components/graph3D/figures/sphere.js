import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';

function sphere (
    R = 10, 
    count = 40,
    center = new Point, 
    color,
    animations,
    name = 'sphere'
) {
    const edges = [];
    const points = [];
    const polygons = [];

    const deltaT = Math.PI / count;
    const deltaF = 2 * Math.PI / count;

    //points
    const dt = Math.PI * 2 / count;
    for (let i = 0; i <= Math.PI; i += dt) {
        for (let j = 0; j < Math.PI * 2; j += dt) {
            points.push(new Point(
                R * Math.cos(j) * Math.sin(i),
                R * Math.cos(i),
                R * Math.sin(j) * Math.sin(i),
            ));
        }
    }

    //ребра 
    for (let i = 0; i < points.length; i++) {
        //вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(
                i,
                i + 1
            ));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(
                i,
                i + 1 - count
            ));
        }
        //поперек
        if (i < points.length - count) {
            edges.push(new Edge(
                i,
                i + count
            ));
        }
    }
    edges.push(new Edge(points.length - count, points.length - 1));

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
    
    return new Subject(points, edges, polygons, name, animations, center);
}

export default sphere;