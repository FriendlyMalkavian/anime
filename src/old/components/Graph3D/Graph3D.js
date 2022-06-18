class Graph3D {
    constructor({WIN}) {
        this.WIN = WIN;
    }

    xs(point) {
        return point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }
    ys(point) {
        return point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }

    clacIlluminationDistance(distance, lumen) {
        const result = distance ? lumen / Math.pow(distance, 3) : 1;
        return result > 1 ? 1 : result;
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
            const edge1 = {
                x : (figure.points[polygon.points[2]].x - figure.points[polygon.points[0]].x),
                y : (figure.points[polygon.points[2]].y - figure.points[polygon.points[0]].y),
                z : (figure.points[polygon.points[2]].z - figure.points[polygon.points[0]].z)
            }
            const edge2 = {
                x : (figure.points[polygon.points[1]].x - figure.points[polygon.points[0]].x),
                y : (figure.points[polygon.points[1]].y - figure.points[polygon.points[0]].y),
                z : (figure.points[polygon.points[1]].z - figure.points[polygon.points[0]].z)
            }
            return polygon.norm = this.multVector(edge1, edge2);
        });
    }

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

    sortByArtistAlgorithm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    multMatrix(T = [], m = []) {
        const matrString = [0, 0, 0, 0]
        for(let j = 0; j < T.length; j++) {
            for(let i = 0; i < T[j].length; i++) {
                matrString[j] += T[j][i] * m[i];
            }
        }
        return matrString;
    }

    transform(matrix, point) {
        const array = this.multMatrix(
            matrix,
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
    
    zoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }

    move(dx, dy, dz) {
        return [
            [1, 0, 0, dx],
            [0, 1, 0, dy],
            [0, 0, 1, dz],
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
}