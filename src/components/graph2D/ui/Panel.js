import React from "react";
import FuncInputs from "../funcinputs/FuncInputs";
import './UI.css'

class Panel extends React.Component {
    constructor(props) {
        super(props);
        const { funcs, addFunction, run } = props;
        this.funcs = funcs;
        this.addFunction = addFunction;
        this.run = run;
    }

    render() {
        return (
            <div>
                <button onClick={() => this.addFunction()}>Добавить</button>
                <div>
                    {this.funcs.map((func, index) => <FuncInputs
                        func={func}
                        run={() => this.run()}
                        key={index}
                    ></FuncInputs>)}
                </div>
            </div>

        )
    }

}
export default Panel;