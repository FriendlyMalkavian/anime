import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';

function tor (r = 15, R = 10, count = 20) {
    const edges = [];
    const points = [];
    const polygons = [];

    const delta = 2 * Math.PI / count;
    
    //points
    for(let i = 0; i < 2 * Math.PI; i += delta) {
        for(let j = -(Math.PI); j < Math.PI; j += delta) {
            points.push(new Point(
                (r + R * Math.cos(j)) * Math.cos(i),
                R * Math.sin(j),
                (r + R * Math.cos(j)) * Math.sin(i)
            ));
        }
    }

    //edges
    for(let i = 0; i < points.length; i++) {
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
    for(let i = 0; i < count; i++) { 
        edges.push(new Edge(i, points.length - count + i))
    }

    //polygons
    for(let i = 0; i < points.length; i++) {
        if(points[i + count + 1]) {
            if((i + 1) % count === 0) {
                polygons.push(new Polygon(
                    [i, i - count + 1, i + 1, i + count]
                ));
            } else
            polygons.push(new Polygon(
                [i, i + 1, i + count + 1, i + count]
            ));
        }
    }
    for(let i = 0; i < count; i++) {
        if(points[points.length - count + i + 1]) {
            polygons.push(new Polygon([i, points.length - count + i, points.length - count + i + 1, i + 1]));
        }
    }
    polygons.push(new Polygon([points.length - 1, points.length - count - 1, points.length - 2 * count, points.length - count]));
    polygons.push(new Polygon([0, count - 1, points.length - 1, points.length - count]));

    return new Subject(points, edges, polygons, 'tor');
}

export default tor;