

/*
Рита решила оставить у себя одежду только трёх цветов: розового, жёлтого и малинового. После того 
как вещи других расцветок были убраны, Рита захотела отсортировать свой новый гардероб по цветам. 
Сначала должны идти вещи розового цвета, потом —– жёлтого, и в конце —– малинового. Помогите Рите 
справиться с этой задачей.

Примечание: попробуйте решить задачу за один проход по массиву!

Формат ввода
В первой строке задано количество предметов в гардеробе: n –— оно не превосходит 1000000. Во второй 
строке даётся массив, в котором указан цвет для каждого предмета. Розовый цвет обозначен 0, жёлтый —– 1, 
малиновый –— 2.

Формат вывода
Нужно вывести в строку через пробел цвета предметов в правильном порядке.


*/



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let length = 0;
let sidesArr;
let result;
let max = [];
let middle = [];
let min = []

rl.on('line', (input) => {
    if(phase === 0) {
        length = parseInt(input);
    }
    if(phase === 1) {
        sidesArr = input.split(' ')
        for(let i = 0; i < length; i++) {


            switch (sidesArr[i]) {
                case '0':
                    min.push('0');
                    break;
                case '1':
                    middle.push('1');
                    break;
                case '2':
                    max.push('2');
                    break;
            }
        }
        result = [...min, ...middle, ...max]

    }
    phase++
});


rl.on('close', () => {
    process.stdout.write(`${result.join(' ')}`);
})