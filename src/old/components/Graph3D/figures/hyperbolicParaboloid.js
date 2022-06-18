Figure.prototype.hyperbolicParaboloid = (y = 8, xz = 10, count = 20) => {
    const edges = [];
    const points = [];
    const polygons = [];
    const delta = 2 * Math.PI / count; 

    //points
    for(let i = -(Math.PI); i < Math.PI; i += delta) {
        for(let j = -(Math.PI); j < Math.PI; j += delta) {
            points.push(new Point(
                i * Math.sqrt(2 * y),
                Math.pow(i, 2) - Math.pow(j, 2),
                j * Math.sqrt(2 * xz)
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

    //polygons
    for(let i = 0; i < points.length; i++) {
        if(points[i + count + 1]) {
            if((i + 1) % count === 0) {
                null
            } else
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
        }
    }

    return new Subject(points, edges, polygons, 'hyperbolicParaboloid');
}