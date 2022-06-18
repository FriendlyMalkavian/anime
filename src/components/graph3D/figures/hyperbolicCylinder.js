import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';

function hyperbolicCylinder (z = 30, y = 7, count = 10) {
    const edges = [];
    const points = [];
    const polygons = [];
    const deltaZ = z / count;
    const deltaT = 2 * Math.PI / count;

    //points
    for(let j = -z; j < z; j += deltaZ) {
        for(let i = -Math.PI; i < Math.PI; i += deltaT) {
            points.push(new Point(
                y * Math.sinh(i),
                j,
                y * Math.cosh(i), 
            ));
        }
    }
    for(let j = -z; j < z; j += deltaZ) {
        for(let i = -(Math.PI); i < Math.PI; i += deltaT) {
            points.push(new Point(
                y * Math.sinh(i),
                j,
                -y * Math.cosh(i), 
            ));
        }
    }

    //edges
    for(let i = 0; i < points.length; i++) {
        if(points[i + 1] && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        }
    }

    //polygons

    //UPPER PART

    // first part
    for(let i = 0; i < points.length / 2 - count; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if((i - 1) % count === 0) {i--}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            if((i >= 2 * count && i < 4 * count) || ((i >= 6 * count && i < 8 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            }
        }
    }
    for(let i = 1; i < points.length / 2 - count; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if((i - 2) % count === 0 && i > 1) {i--}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            if((i >= 2 * count && i < 4 * count) || ((i >= 6 * count && i < 8 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            }
        }
    }
    //second part
    for(let i = 2; i < points.length / 2 - count; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if((i - 3) % count === 0 && i > 0) {i--}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            if((i >= 2 * count && i < 4 * count) || ((i >= 6 * count && i < 8 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            }
        }
    }
    for(let i = 3; i < points.length / 2 - count; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if(i % count === 0 && i > 0) {i+=3}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            if((i >= 2 * count && i < 4 * count) || ((i >= 6 * count && i < 8 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            }
        }
    }

    /// LOWER PART

    for(let i = points.length / 2 + 2; i < points.length; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if((i - 1) % count === 0) {i--}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            if((i >= 13 * count && i < 15 * count) || ((i >= 17 * count && i < 19 * count)) || ((i >= 21 * count && i < 23 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            }
        }
    }
    for(let i = points.length / 2 + 1; i < points.length; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if((i - 2) % count === 0 && i > 1) {i--}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            if((i >= 13 * count && i < 15 * count) || ((i > 17 * count && i < 19 * count)) || ((i >= 21 * count && i < 23 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            }
        }
    }
    //second part
    for(let i = points.length / 2; i < points.length; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if((i - 3) % count === 0 && i > 0) {i--}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            if((i >= 13 * count && i < 15 * count) || ((i >= 17 * count && i < 19 * count)) || ((i >= 21 * count && i < 23 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            }
        }
    }
    for(let i = points.length / 2 - 1; i < points.length; i+=4) { 
        if(points[i + count] && (i + 1) % count !== 0) {
            if(i % count === 0 && i > 0) {i+=3}
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#EA53D7'));
            if((i >= 13 * count && i < 15 * count) || ((i >= 17 * count && i < 19 * count)) || ((i >= 21 * count && i < 23 * count))) {
                polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], '#4298FF'));
            }
        }
    }
    
    return new Subject(points, edges, polygons, 'hyperbolicCylinder');
}

export default hyperbolicCylinder;