const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let current = '';       // expressão atual
let lastResult = null;  // último resultado
let lastOperator = '';  // último operador usado
let justEvaluated = false;

function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Limpar tudo
    if (button.id === 'clear') {
      current = '';
      lastResult = null;
      lastOperator = '';
      justEvaluated = false;
      updateDisplay('0');
      return;
    }

    // Backspace
    if (button.id === 'ce') {
      current = current.slice(0, -1);
      updateDisplay(current || '0');
      return;
    }

    // Igual
    if (button.id === 'equals') {
      try {
        lastResult = eval(current);
        updateDisplay(lastResult.toString());
        justEvaluated = true;
      } catch {
        updateDisplay('Erro');
      }
      return;
    }

    // Funções especiais (1/x, x², √)
    if (value === '1/x') {
      current = (1 / parseFloat(display.textContent)).toString();
      updateDisplay(current);
      justEvaluated = true;
      return;
    }

    if (value === 'x²') {
      current = Math.pow(parseFloat(display.textContent), 2).toString();
      updateDisplay(current);
      justEvaluated = true;
      return;
    }

    if (value === '√') {
      current = Math.sqrt(parseFloat(display.textContent)).toString();
      updateDisplay(current);
      justEvaluated = true;
      return;
    }

    if (button.id === 'sign') {
      current = display.textContent.startsWith('-')
        ? display.textContent.slice(1)
        : '-' + display.textContent;
      updateDisplay(current);
      return;
    }

    // Se acabou de calcular e apertou operador → encadear cálculo
    if (justEvaluated) {
      if (['+', '-', '*', '/'].includes(value)) {
        current = lastResult.toString() + value;
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
