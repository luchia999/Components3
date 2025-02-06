import { useState } from 'react';
import './App.css';
import styles from'./App.module.css';

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const App = () => {
	const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState('');
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

    const handleNumberClick = (num) => {
        if (operator) {
            setOperand2((prev) => prev + num);
        } else {
            setOperand1((prev) => prev + num);
        }
    };

    const handleOperatorClick = (op) => {
        if (!operator && operand1) {
            setOperator(op);
        }
    };

    const handleCalculate = () => {
        if (!operand1 || !operand2 || !operator) return;

        let res;
        switch (operator) {
            case '+':
                res = Number(operand1) + Number(operand2);
                break;
            case '-':
                res = Number(operand1) - Number(operand2);
                break;
            default:
                return;
        }

        setResult(res.toString());
        setIsResultDisplayed(true);
        setOperand1(res.toString());
        setOperand2('');
        setOperator('');
    };

    const handleClear = () => {
        setOperand1('');
        setOperand2('');
        setOperator('');
        setResult('');
        setIsResultDisplayed(false);
    };

    return (
        <div className={styles.calculator}>
            <div className={`${styles.display} ${isResultDisplayed ? styles.result : ''}`}>
                {isResultDisplayed ? result : (operator ? `${operand1} ${operator} ${operand2}` : operand1)}
            </div>
            <div className={styles.buttonPanel}>
                {NUMS.map(num => (
                    <button key={num} onClick={() => handleNumberClick(num)}>{num}</button>
                ))}
                <button onClick={() => handleOperatorClick('+')}>+</button>
                <button onClick={() => handleOperatorClick('-')}>-</button>
                <button onClick={handleCalculate}>=</button>
                <button onClick={handleClear}>C</button>
            </div>
        </div>
    );
};


