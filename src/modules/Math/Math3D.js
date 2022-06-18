class Math3D {
    constructor({WIN}) {
        this.WIN = WIN;

        this.plane = {
            //NormVect
            A: 0,
            B: 0,
            C: 0,
            //point of plane
            x0: 0,
            y0: 0,
            z0: 0,
            //point of camera
            xs0: 0,
            ys0: 0,
            zs0: 0
        }
    }

    xs(point) {
        return point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }
    ys(point) {
        return point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }

    //Rotate Camera
    calcProection(point) {
        const { A, B, C, x0, y0, z0, xs0, ys0, zs0 } = this.plane;
        const m = point.x - xs0;
        const n = point.y - ys0;
        const p = point.z - zs0;
        const t = (A*(x0 - xs0) + B*(y0 - ys0) + C*(z0 - zs0)) / (A*m + B*n + C*p);
        const ps = {
            x: x0 + m * t,
            y: y0 + n * t,
            z: z0 + p * t
        }
        return {
            x: ps.x, // - A,
            y: ps.y, //- B,
            z: ps.z, //- C
        }
    }

    getProection(point) {
        const M = this.calcProection(point);
        const P2M = this.calcVector(this.WIN.P2, M);
        const cosAlpha = this.calcCorner(this.P2P1, M);
        const cosBeta = this.calcCorner(this.P2P3, M);
        const module = Math.sqrt(Math.pow(P2M.x, 2) + Math.pow(P2M.y, 2) + Math.pow(P2M.z, 2));
        return {
            x: cosBeta * module,
            y: cosAlpha * module
        }
    }

    calcPlaneEquation(cameraPoint, planeCenter) {
        const vector = this.calcVector(cameraPoint, planeCenter);
        this.plane.A = vector.x;
        this.plane.B = vector.y;
        this.plane.C = vector.z;
        
        this.plane.x0 = planeCenter.x;
        this.plane.y0 = planeCenter.y;
        this.plane.z0 = planeCenter.z;

        this.plane.xs0 = cameraPoint.x;
        this.plane.ys0 = cameraPoint.y;
        this.plane.zs0 = cameraPoint.z;
    }

    calcPlane() {
        this.calcPlaneEquation(this.WIN.CAMERA, this.WIN.DISPLAY);
    }

    calcWindowVectors() {
        this.P2P1 = this.calcVector(this.WIN.P2, this.WIN.P1);
        this.P2P3 = this.calcVector(this.WIN.P2, this.WIN.P3);
    }
    
    //Math for Vectors
    calcVector(a, b) {
        return {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z
        }
    }

    calcCorner(a, b) {
        return (a.x * b.x + a.y * b.y + a.z * b.z) / (this.calcModule(a) * this.calcModule(b));
    }

    calcModule(a) {
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2));
    }

    multVector(vec1, vec2) {
        return {
            x : vec1.y * vec2.z - vec1.z * vec2.y,
            y : vec1.z * vec2.x - vec1.x * vec2.z,
            z : vec1.x * vec2.y - vec1.y * vec2.x
        }
    }

    normVector(figure) {
        figure.polygons.forEach(polygon => {
            const edge1 = this.calcVector(
                figure.points[polygon.points[0]], 
                figure.points[polygon.points[1]]
            );
            const edge2 = this.calcVector(
                figure.points[polygon.points[0]], 
                figure.points[polygon.points[2]]
            );
            return polygon.norm = this.multVector(edge1, edge2);
        });
    }

    //polygon`s methods
    clacDisctance(figure, endPoint, name) {
        figure.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0;
            let y = 0;
            let z = 0;
            for(let i = 0; i < points.length; i++) {
                x += figure.points[points[i]].x;
                y += figure.points[points[i]].y;
                z += figure.points[points[i]].z;
            }
            x /= points.length;
            y /= points.length;
            z /= points.length;
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - x, 2) + 
                Math.pow(endPoint.y - y, 2) + 
                Math.pow(endPoint.z - z, 2)
            );
        });
    }

    clacIlluminationDistance(distance, lumen) {
        const result = distance ? lumen / Math.pow(distance, 3) : 1;
        return result > 1 ? 1 : result;
    }

    sortByArtistAlgorithm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }


    //Transform methods
    //Point
    transform(matrix, point) {
        const array = this.multMatrix(
            matrix,
            [[point.x, 0, 0, 0], [point.y, 0, 0, 0], [point.z, 0, 0, 0], [1, 0, 0, 0]]
        );
        point.x = array[0][0];
        point.y = array[1][0];
        point.z = array[2][0];
    }
    //Matrix
    multMatrix(T = [], m = []) {
        const matrString = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
        for(let j = 0; j < T.length; j++) {
            for(let i = 0; i < T[j].length; i++) {
                for(let k = 0; k < T[j].length; k ++) {
                    matrString[j][i] += T[j][k] * m[k][i];
                }
            }
        }
        return matrString;
    }

    //Matrixes
    zoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }

    move({x, y, z}) {
        return [
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1]
        ];
    }

    rotateOy(alpha) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -(Math.sin(alpha)), Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    rotateOx(alpha) {
        return [
            [Math.cos(alpha), 0, -(Math.sin(alpha)), 0],
            [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    rotateOz(alpha) {
        return [
            [Math.cos(alpha), Math.sin(alpha), 0, 0],
            [-(Math.sin(alpha)), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }

    one() {
        return [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }
}
export default Math3D;