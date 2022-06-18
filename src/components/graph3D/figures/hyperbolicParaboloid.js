import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';
import FigureAnimation from '../Entities/FigureAnimation';

function hyperbolicParaboloid (y = 8, xz = 10, count = 20) {
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
    let color1='#00ff00';
    let color2='#00ffff';
    for (let i = 0; i < points.length; i++) {
       if (i + 1 + count < points.length && (i + 1) % count !== 0) {
           if(i%2 ===0)polygons.push(new Polygon([i,i+1,i+1+count,i+count],color1));
           else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],color2));
       } 
       
       if((i+1+count)%count===0){
           let a=color1;
           color1=color2;
           color2=a;
       }
   }

    //animation 
    const animation = [
        new FigureAnimation('rotateOy' , Math.PI / 180),
        new FigureAnimation('rotateOx', Math.PI / 180),
        new FigureAnimation('rotateOz', Math.PI / 180),
    ];

    return new Subject(points, edges, polygons, 'hyperbolicParaboloid', animation);
}

export default hyperbolicParaboloid;