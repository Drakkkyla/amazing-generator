// Функция для генерации всех перестановок массива
function generatePermutations(arr) {
    if (arr.length === 0) return [[]];
    if (arr.length === 1) return [arr];
    
    const permutations = [];
    
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const remainingPerms = generatePermutations(remaining);
        
        for (const perm of remainingPerms) {
            permutations.push([current, ...perm]);
        }
    }
    
    return permutations;
}

// Функция для форматирования числа
function formatNumber(num) {
    // Если число целое, показываем без десятичных знаков
    if (Number.isInteger(parseFloat(num))) {
        return parseInt(num);
    }
    return parseFloat(num);
}

// Функция для отображения результатов
function displayResults(permutations) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsGrid = document.getElementById('resultsGrid');
    const totalCount = document.getElementById('totalCount');
    
    resultsGrid.innerHTML = '';
    totalCount.textContent = `Всего: ${permutations.length}`;
    
    permutations.forEach((perm, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.style.animationDelay = `${index * 0.01}s`;
        
        const numbersDiv = document.createElement('div');
        numbersDiv.className = 'numbers';
        
        perm.forEach(num => {
            const numSpan = document.createElement('span');
            numSpan.className = 'number';
            numSpan.textContent = formatNumber(num);
            numbersDiv.appendChild(numSpan);
        });
        
        item.appendChild(numbersDiv);
        resultsGrid.appendChild(item);
    });
    
    resultsSection.style.display = 'block';
}

// Обработчик кнопки генерации
document.getElementById('generateBtn').addEventListener('click', function() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const num3 = document.getElementById('num3').value;
    const num4 = document.getElementById('num4').value;
    
    // Проверка на заполненность всех полей
    if (num1 === '' || num2 === '' || num3 === '' || num4 === '') {
        alert('Пожалуйста, заполните все 4 поля с числами!');
        return;
    }
    
    // Преобразование в числа
    const numbers = [
        parseFloat(num1),
        parseFloat(num2),
        parseFloat(num3),
        parseFloat(num4)
    ];
    
    // Проверка на валидность чисел
    if (numbers.some(isNaN)) {
        alert('Пожалуйста, введите корректные числа!');
        return;
    }
    
    // Проверка на диапазон 0-9
    if (numbers.some(num => num < 0 || num > 9)) {
        alert('Можно вводить только числа от 0 до 9!');
        return;
    }
    
    // Генерация перестановок
    const permutations = generatePermutations(numbers);
    
    // Отображение результатов
    displayResults(permutations);
});

// Обработка Enter в полях ввода
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('generateBtn').click();
        }
    });
});

// Ограничение ввода чисел от 0 до 9
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 0) {
            this.value = '';
        } else if (value > 9) {
            this.value = 9;
        }
    });
    
    input.addEventListener('blur', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 0) {
            this.value = '';
        } else if (value > 9) {
            this.value = 9;
        }
    });
    
    // Запрет на ввод недопустимых символов
    input.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char) && e.which !== 8 && e.which !== 0) {
            e.preventDefault();
        }
    });
});

// Автоматическая генерация при заполнении всех полей (опционально)
let autoGenerateTimeout;
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        clearTimeout(autoGenerateTimeout);
        
        const num1 = document.getElementById('num1').value;
        const num2 = document.getElementById('num2').value;
        const num3 = document.getElementById('num3').value;
        const num4 = document.getElementById('num4').value;
        
        // Автогенерация через 1 секунду после последнего ввода, если все поля заполнены
        if (num1 && num2 && num3 && num4) {
            autoGenerateTimeout = setTimeout(() => {
                document.getElementById('generateBtn').click();
            }, 1000);
        }
    });
});

