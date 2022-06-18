Figure.prototype.parabolicCylinder = (z = 10, Ox = 4, count = 10) => {
    const edges = [];
    const points = [];
    const polygons = [];

    const deltaZ = z / count;
    const deltaT = Math.PI / count;

    //points
    for(let j = -z; j < z; j += deltaZ) {
        for(let i = 0; i < 2 * Math.PI; i += deltaT) {
            points.push(new Point(
                Math.sqrt(2 * Ox * i),
                j,
                i, 
            ));
        }
    }
    for(let j = -z; j < z; j += deltaZ) {
        for(let i = 0; i < 2 * Math.PI; i += deltaT) {
            points.push(new Point(
                -Math.sqrt(2 * Ox * i),
                j,
                i, 
            ));
        }
    }
    
    //edges
    for(let i = 0; i < points.length; i++) {
        if(points[i + 1]) {
            if(((i + 1) % (count * 2) === 0)) {
                null
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
    }
    for(let j = points.length / 2; j < points.length; j++) {
        if(points[j + count * 2]) {
            edges.push(new Edge(j, j + count * 2));
        }
    }
    for(let j = 0; j < points.length / 2 - count * 2; j++) {
        if(points[j + count * 2]) {
            edges.push(new Edge(j, j + count * 2));
        }
    }

    //polygons
    for(let i = 0; i < points.length / 2 - count * 2; i++) {
        if(points[i + count * 2 + 1]) {
            if((i + 1) % (count * 2) === 0) {
                null
            } else
            polygons.push(new Polygon([i, i + 1, i + count * 2 + 1, i + count * 2]));
        }
    }
    for(let i = points.length / 2; i < points.length; i++) {
        if(points[i + count * 2 + 1]) {
            if((i + 1) % (count * 2) === 0) {
                null
            } else
            polygons.push(new Polygon([i, i + 1, i + count * 2 + 1, i + count * 2]));
        }
    }
    

    return new Subject(points, edges, polygons, 'parabolicCylinder');
}