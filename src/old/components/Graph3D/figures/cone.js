Figure.prototype.cone = (xz = 5, y = 10, count = 20) => {
    const edges = [];
    const points = [];
    const polygons = [];
    const delta = 2 * Math.PI / count;

    //points
    for(let i = 0; i < 2 * Math.PI; i += delta) {
        for(let j = 0; j < 2 * Math.PI; j += delta) {
            points.push(new Point(
                xz * i * Math.sin(j),
                y * i,
                xz * i * Math.cos(j)
            ));
        }
    }
    for(let i = 0; i < 2 * Math.PI; i += delta) {
        for(let j = 0; j < 2 * Math.PI; j += delta) {
            points.push(new Point(
                xz * i * Math.sin(j),
                -y * i,
                xz * i * Math.cos(j)
            ));
        }
    }
    
    //edges
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
    for(let i = 0; i < points.length / 2; i++) {
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
        if(points[i + count + 1]) {
            if((i + 1) % count === 0) {
                polygons.push(new Polygon([i, i - count + 1, i + 1, i + count]));
            } else
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
        }
    }
    for(let i = points.length / 2; i < points.length; i++) {
        if(points[i + count + 1]) {
            if((i + 1) % count === 0) {
                polygons.push(new Polygon([i, i - count + 1, i + 1, i + count]));
            } else
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
        }
    }
    polygons.push(new Polygon([points.length - 1, points.length - count - 1, points.length - 2 * count, points.length - count]));

    return new Subject(points, edges, polygons, 'cone');
}