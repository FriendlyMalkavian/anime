import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';

function cube (lenght = 10, lenMult = 1, color = '#ff00ff', widMult = 1, center = new Point, name = 'cube', animations) {
    const points = [
        new Point((lenght + center.x) * widMult, (lenght + center.z) * lenMult, lenght + center.y),
        new Point((lenght + center.x) * widMult, (lenght + center.z) * lenMult, -lenght + center.y),
        new Point((-lenght + center.x) * widMult, (lenght + center.z) * lenMult, lenght + center.y),
        new Point((lenght + center.x) * widMult, (-lenght + center.z) * lenMult, lenght + center.y),
        new Point((-lenght + center.x) * widMult, (-lenght + center.z) * lenMult, lenght + center.y),
        new Point((-lenght + center.x) * widMult, (lenght + center.z) * lenMult, -lenght + center.y),
        new Point((-lenght + center.x) * widMult, (-lenght + center.z) * lenMult, -lenght + center.y),
        new Point((lenght + center.x) * widMult, (-lenght + center.z) * lenMult, -lenght + center.y),
    ];
    const edges = [
        new Edge(0, 1), new Edge(0, 2), new Edge(0, 3),
        new Edge(4, 2), new Edge(4, 3),
        new Edge(5, 1), new Edge(5, 2),
        new Edge(6, 5), new Edge(6, 4),
        new Edge(7, 6), new Edge(7, 3), new Edge(7, 1)
    ];
    const polygons = [
        new Polygon([3, 0, 1, 7], color), new Polygon([6, 5, 2, 4], color),
        new Polygon([4, 3, 7, 6], color), new Polygon([4, 2, 0, 3], color),
        new Polygon([7, 1, 5, 6], color), new Polygon([2, 5, 1, 0], color)
    ];
    return new Subject (points, edges, polygons, name, animations);
}

export default cube;