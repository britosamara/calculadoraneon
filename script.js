const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let current = '';
let justEvaluated = false;

function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.id === 'clear') {
      current = '';
      updateDisplay('0');
      justEvaluated = false;
    } else if (button.id === 'ce') {
      current = current.slice(0, -1);
      updateDisplay(current || '0');
    } else if (button.id === 'equals') {
      try {
        current = eval(current.replace(',', '.')).toString();
        updateDisplay(current);
        justEvaluated = true;
      } catch {
        current = 'Erro';
        updateDisplay(current);
        justEvaluated = true;
      }
    } else if (value === '1/x') {
      current = (1 / parseFloat(current)).toString();
      updateDisplay(current);
    } else if (value === 'x²') {
      current = Math.pow(parseFloat(current), 2).toString();
      updateDisplay(current);
    } else if (value === '√') {
      current = Math.sqrt(parseFloat(current)).toString();
      updateDisplay(current);
    } else if (button.id === 'sign') {
      if (current) {
        if (current.charAt(0) === '-') {
          current = current.slice(1);
        } else {
          current = '-' + current;
        }
        updateDisplay(current);
      }
    } else {
      // Permite continuar cálculo após '='
      if (justEvaluated) {
        if (['+', '-', '*', '/'].includes(value)) {
          current += value;
        } else {
          current = value;
        }
        justEvaluated = false;
      } else {
        current += value.replace(',', '.');
      }

      updateDisplay(current);
    }
  });
});
