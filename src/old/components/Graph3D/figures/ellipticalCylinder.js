Figure.prototype.ellipticalCylinder = (x = 10, z = 8, y = 20, count = 16) => {
    const edges = [];
    const points = [];
    const polygons = [];
    const upperBasePolygons = [];
    const lowerBasePolygons = [];
    const deltaY= y / count;
    const deltaT = (2 * Math.PI) / count;

    //points
    for(let j = -y; j < y; j += deltaY) {
        for(let i = 0; i < 2 * Math.PI; i += deltaT) {
            points.push(new Point(
                x * Math.cos(i),
                j,
                z * Math.sin(i), 
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
    edges.push(new Edge(points.length - count, points.length - 1));

    //polygons
    for(let i = 0; i < points.length; i++) {
        if(points[i + count + 1]) {
            if((i + 1) % count === 0) {
                polygons.push(new Polygon([i, i - count + 1, i + 1, i + count]));
            } else
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
        }
    }
    polygons.push(new Polygon([points.length - 1, points.length - count - 1, points.length - 2 * count, points.length - count]));
    for(let i = 0; i < count; i++) { lowerBasePolygons.push(i) }
    for(let i = points.length- 1; i >= points.length - count; i--) { upperBasePolygons.push(i) }
    polygons.push(new Polygon(lowerBasePolygons));
    polygons.push(new Polygon(upperBasePolygons));

    return new Subject(points, edges, polygons, 'ellipticalCylinder');
}