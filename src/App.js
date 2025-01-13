import styles from './App.module.css';
import { useState } from 'react';

const NUMS = [
	{ name: '7', type: 'digits' },
	{ name: '8', type: 'digits' },
	{ name: '9', type: 'digits' },
	{ name: '+', type: 'mathButtons' },
	{ name: '4', type: 'digits' },
	{ name: '5', type: 'digits' },
	{ name: '6', type: 'digits' },
	{ name: '-', type: 'mathButtons' },
	{ name: '1', type: 'digits' },
	{ name: '2', type: 'digits' },
	{ name: '3', type: 'digits' },
	{ name: 'x', type: 'mathButtons' },
	{ name: 'C', type: 'clearButton' },
	{ name: '0', type: 'digits' },
	{ name: '=', type: 'mathButtons' },
	{ name: '/', type: 'mathButtons' },
];

function App() {
	const [operand1, setOperand1] = useState('0');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');

	const output = operator ? `${operand1} ${operator} ${operand2}` : operand1.toString();

	const calculateResult = () => {
		const num1 = parseFloat(operand1);
		const num2 = parseFloat(operand2);

		switch (operator) {
			case '+':
				setOperand1(String(num1 + num2));
				break;
			case '-':
				setOperand1(String(num1 - num2));
				break;
			case '*':
				setOperand1(String(num1 * num2));
				break;
			case '/':
				setOperand1(num2 !== '0' ? String(num1 / num2) : 'Error');
				break;
			default:
				break;
		}

		setOperand2('');
		setOperator('');
	};

	return (
		<div className={styles.container}>
			<form name="calculator">
				<fieldset className={styles.calc}>
					<input
						className={styles.display}
						type="text"
						value={output}
						readOnly
					/>
					{NUMS.map((item, index) => (
						<button
							key={index}
							className={`${styles.button} ${styles[item.type]}`}
							type="button"
							onClick={() => {
								if (item.name === 'C') {
									setOperand1('0');
									setOperand2('');
									setOperator('');
								} else if (item.name === '=') {
									calculateResult();
								} else if (item.type === 'mathButtons') {
									setOperator(item.name === 'x' ? '*' : item.name);
									setOperand2('');
								} else {
									if (!operator) {
										setOperand1(
											`${operand1 === '0' ? '' : operand1}${item.name}`,
										);
									} else {
										setOperand2(`${operand2}${item.name}`);
									}
								}
							}}
						>
							{item.name}
						</button>
					))}
				</fieldset>
			</form>
		</div>
	);
}
export default App;
