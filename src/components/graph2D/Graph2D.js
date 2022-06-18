import React from "react";
import { useSearchParams, useEffect }  from "react-router-dom";
import Canvas from '../../modules/Canvas';
import UI from './ui/UI';


class Graph2D extends React.Component{
    constructor(props){
        super(props);
        this.WIN = {
            LEFT:  -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20
        }
        this.searchParams = useSearchParams;
        this.funcParam = this.funcParam;
        this.funcs = [];
        this.state = {funcsLength: this.funcs.length}
    }

    componentDidMount(){ //Аналог события onload в ванильном js
        this.canvas = new Canvas({
            id: 'graph2DCanvas',
            WIN: this.WIN
        });
        this.canvas.clear();
        this.run();
    }

    run() { //Метод, который рисует картинку
        this.canvas.clear();
        this.funcs.forEach(f => {
            if (f) {
                this.printFunction(f.f, f.color, f.width);
            }
        });
    }

    printFunction(f, color, width) {
        let x = this.WIN.LEFT;
        const dx = this.WIN.WIDTH / 1000;
        while (x < this.WIN.LEFT + this.WIN.WIDTH) {
            this.canvas.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    addFunction(){
        this.funcs.push({
            f: () => null,
            color: 'red',
            width: 2
        });
        this.setState({ funcsLength: this.funcs.length });
    }

    del(){}

    render(){
        return( 
            <div className='graph2D'>
                <canvas id = 'graph2DCanvas'
                    /*onWheel={() => this.onWheel()}*/
                    /*onMouseMove={() => this.onMouseMove()}*/
                    /*onMouseUp={() => this.onMouseUp()}*/
                    /*onMouseDown={() => this.onMouseDown()}*/
                ></canvas> 
                <UI
                    funcs = {this.funcs}
                    addFunction ={() => this.addFunction() }
                    run={() => this.run()}
                ></UI>
            </div>
        )
    }
}
export default Graph2D;