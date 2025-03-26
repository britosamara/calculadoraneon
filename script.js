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
        result = eval(current);
        updateDisplay(result.toString());
        justEvaluated = true;
      } catch {
        updateDisplay('Erro');
        current = '';
        justEvaluated = false;
      }
      return;
    }

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
      current = display.textContent.startsWith('-') ? display.textContent.slice(1) : '-' + display.textContent;
      updateDisplay(current);
      return;
    }

    if (justEvaluated) {
      current = ['+', '-', '*', '/'].includes(value) ? result + value : value;
      justEvaluated = false;
    } else {
      current += value.replace(',', '.');
    }

    updateDisplay(current);
  });
});

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      installBtn.style.display = 'none';
    });
  }
});
