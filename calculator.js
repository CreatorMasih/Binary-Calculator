function validateInput(input, base) {
    const regexMap = {
        binary: /^[01]+$/,
        octal: /^[0-7]+$/,
        decimal: /^\d+$/,
        hexadecimal: /^[0-9A-Fa-f]+$/
    };
    return regexMap[base].test(input);
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function toggleInstructions() {
    const instructions = document.getElementById('instructions');
    instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
}

function convertSingleNumber() {
    showLoading();
    const input = document.getElementById('singleInput').value.trim();
    const inputType = document.getElementById('singleInputType').value;
    const resultType = document.getElementById('singleResultType').value;

    if (!validateInput(input, inputType)) {
        alert('Invalid input for the selected base.');
        hideLoading();
        return;
    }

    const decimal = convertToDecimal(input, inputType);
    const result = convertFromDecimal(decimal, resultType);

    document.getElementById('result').innerText = `Result: ${result}`;
    hideLoading();
}

function performOperation() {
    showLoading();
    const input1 = document.getElementById('input1').value.trim();
    const input2 = document.getElementById('input2').value.trim();
    const input1Type = document.getElementById('input1Type').value;
    const input2Type = document.getElementById('input2Type').value;
    const operation = document.getElementById('arithmeticType').value;
    const resultType = document.getElementById('resultType').value;

    if (!validateInput(input1, input1Type) || !validateInput(input2, input2Type)) {
        alert('Invalid input for the selected base.');
        hideLoading();
        return;
    }

    const decimal1 = convertToDecimal(input1, input1Type);
    const decimal2 = convertToDecimal(input2, input2Type);

    let result;
    switch (operation) {
        case '+':
            result = decimal1 + decimal2;
            break;
        case '-':
            result = decimal1 - decimal2;
            break;
        case '*':
            result = decimal1 * decimal2;
            break;
        case '/':
            if (decimal2 === 0) {
                alert('Division by zero is not allowed.');
                hideLoading();
                return;
            }
            result = decimal1 / decimal2;
            break;
        default:
            alert('Invalid operation.');
            hideLoading();
            return;
    }

    const finalResult = convertFromDecimal(result, resultType);
    document.getElementById('result').innerText = `Result: ${finalResult}`;
    hideLoading();
}

function convertToDecimal(input, base) {
    switch (base) {
        case 'binary':
            return parseInt(input, 2 );
        case 'octal':
            return parseInt(input, 8);
        case 'decimal':
            return parseInt(input, 10);
        case 'hexadecimal':
            return parseInt(input, 16);
        default:
            return null;
    }
}

function convertFromDecimal(decimal, base) {
    switch (base) {
        case 'binary':
            return decimal.toString(2);
        case 'octal':
            return decimal.toString(8);
        case 'decimal':
            return decimal.toString(10);
        case 'hexadecimal':
            return decimal.toString(16).toUpperCase();
        default:
            return null;
    }
}

function clearInput() {
    document.getElementById('singleInput').value = '';
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('result').innerText = '';
    hideLoading();
}

// Background change function
function changeBackground() {
    const backgrounds = [
        'rgba(0, 0, 0, 0.8)',
        'rgba(18, 18, 18, 0.8)',
        'rgba(28, 28, 28, 0.8)'
    ];
    let index = 0;
    setInterval(() => {
        document.body.style.backgroundColor = backgrounds[index];
        index = (index + 1) % backgrounds.length;
    }, 5000);
}

// Initiate background change
changeBackground();