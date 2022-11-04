/* 
Астрологи объявили день очередей ограниченного размера. Тимофею нужно написать класс MyQueueSized, 
который принимает параметр max_size, означающий максимально допустимое количество элементов в очереди.

Помогите ему —– реализуйте программу, которая будет эмулировать работу такой очереди. Функции, которые 
надо поддержать, описаны в формате ввода.

Формат ввода
В первой строке записано одно число — количество команд, оно не превосходит 5000.
Во второй строке задан максимально допустимый размер очереди, он не превосходит 5000.
Далее идут команды по одной на строке. Команды могут быть следующих видов:

push(x) — добавить число x в очередь;
pop() — удалить число из очереди и вывести на печать;
peek() — напечатать первое число в очереди;
size() — вернуть размер очереди;
При превышении допустимого размера очереди нужно вывести «error». При вызове операций pop() или peek() 
для пустой очереди нужно вывести «None».
Формат вывода
Напечатайте результаты выполнения нужных команд, по одному на строке.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;

class Queque {
    constructor(start = null, end = null, number = 0) {
        this.start = start;
        this.end = end;
        this.maxNumber = number;
        this.counter = 0;
    }

    setSize(number) {
        this.maxNumber = number;
    }

    push(value) {
        if(this.counter + 1 >  this.maxNumber) {
            return false
        }

        if(this.start && this.end) {
            let newItem = {
                value,
                prev: null,
            }
            this.end.prev = newItem;
            this.end = newItem
            this.counter++
            return this.counter;
        } else {
            let newItem = {
                value,
                prev: null,
            }
            this.end = newItem;
            this.start = newItem;
            this.counter++
            return this.counter;
        }
    }

    pop() {
        if(this.counter === 0) {
            return 'None';
        }

        if(this.counter === 1) {
            let value = this.start.value;
            this.start = null;
            this.end = null;
            this.counter--
            return value;
        } else {
            let value = this.start.value;
            this.start = this.start.prev;
            this.counter--
            return value;
        }
    }

    peek() {
        if(this.counter === 0) {
            return 'None';
        }
        return this.start.value;
    }

    size() {
        return this.counter;
    }
}


const queqe = new Queque();

rl.on('line', (input) => {
    let string = input.split(' ');
    let comand = string[0];

    if(phase === 1) {
        queqe.setSize(parseInt(input));
    }

    if(phase > 1) {
        switch (comand) {
            case 'peek':
                process.stdout.write(`${queqe.peek()}`);
                process.stdout.write('\n');
                break;
            case 'push':
                let pushResult = queqe.push(string[1]);
                if(!pushResult) {
                    process.stdout.write(`error`);
                    process.stdout.write('\n');
                }
                break;
            case 'pop':
                process.stdout.write(`${queqe.pop()}`);
                process.stdout.write('\n');
                break;
            case 'size':
                process.stdout.write(`${queqe.size()}`);
                process.stdout.write('\n');
                break;
        }
    }
    // console.dir(queqe)
    phase++
});
