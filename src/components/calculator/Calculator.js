import React from 'react';
import UniversalCalculator from '../../modules/calculator/UniversalCalculator';
import './Calculator.css';

class Calculator extends React.Component {

    constructor(props) {
        super(props)

        const calc = new UniversalCalculator;

        const a = calc.vector([
            calc.matrix([
                [calc.complex(1, 2), calc.complex(3, 4)], 
                [calc.complex(5, 6), calc.complex(7, 8)]
            ]), 
            calc.matrix([
                [calc.complex(10, 20), calc.complex(30, 40)], 
                [calc.complex(50, 60), calc.complex(70, 80)]
            ])
        ]);
        const b = calc.vector([
            calc.matrix([
                [calc.complex(100, 200), calc.complex(300, 400)], 
                [calc.complex(500, 600), calc.complex(700, 800)]
            ]), 
            calc.matrix([
                [calc.complex(1000, 2000), calc.complex(3000, 4000)], 
                [calc.complex(5000, 6000), calc.complex(7000, 8000)]
            ])
        ]);
        const c = calc.add(a, b);

        console.log(c)
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <textarea className="numbers" id="a" placeholder="0"></textarea>
                        <textarea className="numbers" id="b" placeholder="0"></textarea>
                    </div>
                    <div>
                        <textarea className="result" id="result" placeholder="result" disabled></textarea>
                    </div>
                </div>
                <div>
                    <button className="operands btn operation" data-operand="add"> Add </button>
                    <button className="operands btn operation" data-operand="sub"> Sub </button>
                    <button className="operands btn operation" data-operand="mult"> Mult </button>
                </div>
                <div>
                    <button className="operands btn operation" data-operand="div"> Div </button>
                    <button className="operands btn operation" data-operand="prod"> Prod </button>
                    <button className="operands btn operation" data-operand="pow"> Pow </button>
                    </div>
                <div>
                    <button className="operands btn operation" data-operand="one"> One </button>
                    <button className="operands btn operation" data-operand="zero"> Zero </button>
                </div>
                <div>
                    <a className='rules'>
                        <h3>формат ввода:</h3>
                        обычные числа ( 1 )<br></br>
                        комплексные числа ( 1+/-i*2 )<br></br>
                        вектора ( (1 2 3) )<br></br>
                        матрицы ( 1, 2 /n 3, 4 )<br></br>
                        полиномиалы ( 1*x^2+/-2*x^3 )
                    </a>
                </div>
            </div>
        );
    }
}

export default Calculator;