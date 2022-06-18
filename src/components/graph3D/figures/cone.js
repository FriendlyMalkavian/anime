import Subject from '../Entities/Subject';
import Point from '../Entities/Point';
import Edge from '../Entities/Edge';
import Polygon from '../Entities/Polygon';

function cone (a = 4, b = 4, c = 4, count = 30) {
    const edges = [];
    const points = [];
    const polygons = [];
    const delta = 2 * Math.PI / count;

    //points
    const dt = 2 * Math.PI / count;
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                a * i * Math.cos(j),
                c * i,
                Math.sin(j) * b * i
            ));
        }
    }

    //основания
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                a * i * Math.cos(j),
                c * Math.PI,
                Math.sin(j) * b * i
            ));
        }
    }
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
            points.push(new Point(
                a * i * Math.cos(j), -c * Math.PI,
                Math.sin(j) * b * i
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

    //полигоны
    let color1='#00ff00';
    let color2='#00ffff';


    for (let i = 0; i < points.length; i++) {
       if (i + 1 + count < points.length && (i + 1) % count !== 0  ) {
           if(i%2 !==0)polygons.push(new Polygon([i,i+1,i+1+count,i+count],color1));
           else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],color2));
       } else if (i + count < points.length && (i + 1) % count === 0) {
           polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count],color1))
       }
       if((i+1+count)%count===0){
           let a=color1;
           color1=color2;
           color2=a;
       }
   }
    
    //animation
    return new Subject(points, edges, polygons, 'cone');
}

export default cone;