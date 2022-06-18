import React from "react";

class FuncInputs extends React.Component{
    constructor(props){
        super(props);
        const{func, run} = props;
        this.func = func;
        this.run = run;
    };

    setFunction(e){
        console.log(e.target.value);
        try{
            let f;
            eval(`f = function (x) {return ${e.target.value};}`);
            this.func.f = f;
            this.func.value = e.target.value;
            this.run();
        } catch (e) {
            console.log(e);
        };
    };
    
    setColor(e) {
        this.func.color = e.target.value;
        this.run();        
    }

    render(){
        return(
            <div>
                <input 
                    onKeyUp={(e) => this.setFunction(e)}
                    placeholder="y=f(x)"
                    defaultValue={this.func.value}></input>
                <input
                    onKeyUp={(e) => this.setColor(e)}
                    placeholder="color"
                    defaultValue={this.func.color}
                ></input>
            </div>
        )
    };
};
export default FuncInputs;