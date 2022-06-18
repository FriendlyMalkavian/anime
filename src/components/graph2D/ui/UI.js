import React from "react";
import Panel from "./Panel";
import './UI.css';

class UI extends React.Component {
    constructor(props) {
        super(props);
        const { addFunction, funcs, run} = props;
        this.addFunction = addFunction;
        this.funcs = funcs;
        this.run = run;
        this.state = { showPanel: false };
    }

    togglePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    

 

    handleClick =(e) => {
        e.target.innerText = e.target.innerText === "Скрыть" ? 'Показать' : "Скрыть"
        this.togglePanel()    
    }

    
    render() {
        return (
            <div>
                <button
                    onClick={this.handleClick}
                >
                    Показать
                </button>
                {this.state.showPanel ? 
                    <Panel
                        // state={store} close = {...}
                        funcs={this.funcs}
                        addFunction={() => this.addFunction()}
                        run={this.run}
                    ></Panel> : ''}
            </div>
        );
    }
}

export default UI;