const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let current = '';
let result = '';
let justEvaluated = false;

function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.id === 'clear') {
      current = '';
      result = '';
      updateDisplay('0');
      justEvaluated = false;
      return;
    }

    if (button.id === 'ce') {
      current = current.slice(0, -1);
      updateDisplay(current || '0');
      return;
    }

    if (button.id === 'equals') {
      try {
        result = eval(current.replace(',', '.')).toString();
        updateDisplay(result);
        justEvaluated = true;
        current = result; // usa o resultado como base para o próximo cálculo
      } catch {
        updateDisplay('Erro');
        current = '';
      }
      return;
    }

    if (value === '1/x') {
      current = (1 / parseFloat(current)).toString();
      updateDisplay(current);
      return;
    }

    if (value === 'x²') {
      current = Math.pow(parseFloat(current), 2).toString();
      updateDisplay(current);
      return;
    }

    if (value === '√') {
      current = Math.sqrt(parseFloat(current)).toString();
      updateDisplay(current);
      return;
    }

    if (button.id === 'sign') {
      if (current.startsWith('-')) {
        current = current.slice(1);
      } else {
        current = '-' + current;
      }
      updateDisplay(current);
      return;
    }

    // Se acabou de calcular e o usuário apertou um operador, continua o cálculo
    if (justEvaluated) {
      if (['+', '-', '*', '/'].includes(value)) {
        current = result + value;
      } else {
        current = value;
      }
      justEvaluated = false;
    } else {
      current += value.replace(',', '.');
    }

    updateDisplay(current);
  });
});
