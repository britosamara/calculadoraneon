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
        result = eval(current).toString();
        updateDisplay(result);
        justEvaluated = true;
      } catch {
        updateDisplay('Erro');
        current = '';
        justEvaluated = false;
      }
      return;
    }

    if (value === '1/x') {
      try {
        result = (1 / parseFloat(display.textContent)).toString();
        updateDisplay(result);
        current = result;
      } catch {
        updateDisplay('Erro');
        current = '';
      }
      return;
    }

    if (value === 'x²') {
      try {
        result = Math.pow(parseFloat(display.textContent), 2).toString();
        updateDisplay(result);
        current = result;
      } catch {
        updateDisplay('Erro');
        current = '';
      }
      return;
    }

    if (value === '√') {
      try {
        result = Math.sqrt(parseFloat(display.textContent)).toString();
        updateDisplay(result);
        current = result;
      } catch {
        updateDisplay('Erro');
        current = '';
      }
      return;
    }

    if (button.id === 'sign') {
      if (display.textContent.startsWith('-')) {
        current = display.textContent.slice(1);
      } else {
        current = '-' + display.textContent;
      }
      updateDisplay(current);
      return;
    }

    // Cálculo encadeado após '='
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
