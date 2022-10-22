// Чтобы подготовиться к семинару, Гоше надо прочитать статью по эффективному менеджменту. 
// Так как Гоша хочет спланировать день заранее, ему необходимо оценить сложность статьи.

// Он придумал такой метод оценки: берётся случайное предложение из текста и в нём ищется самое длинное слово. 
// Его длина и будет условной сложностью статьи.

// Помогите Гоше справиться с этой задачей.

// Формат ввода
// В первой строке дана длина текста L (1 ≤ L ≤ 105).

// В следующей строке записан текст, состоящий из строчных латинских букв и пробелов. Слово —– последовательность букв, 
// не разделённых пробелами. Пробелы могут стоять в самом начале строки и в самом её конце. Текст заканчивается переносом строки, 
// этот символ не включается в число остальных L символов.

// Формат вывода
// В первой строке выведите самое длинное слово. Во второй строке выведите его длину. Если подходящих 
// слов несколько, выведите то, которое встречается раньше.


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let array;

function merge(left, right) {
    let arr = []
    while (left.length && right.length) {
        if (left[0].length > right[0].length) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }

    return [ ...arr, ...left, ...right ]
}

function mergeSort(array) {
    const half = array.length / 2
    
    if(array.length < 2){
      return array 
    }
    
    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
}

rl.on('line', (input) => {
    if(phase === 1) {
        array = input.split(" ");
        array = mergeSort(array)
        return;
    }
    phase++
});

rl.on('close', () => {
    array = mergeSort(array)
    process.stdout.write(array[0].toString());
    process.stdout.write('\n');
    process.stdout.write(array[0].length.toString());
})
