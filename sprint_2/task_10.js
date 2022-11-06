/* 
Любимый вариант очереди Тимофея — очередь, написанная с использованием связного списка. 
Помогите ему с реализацией. Очередь должна поддерживать выполнение трёх команд:

get() — вывести элемент, находящийся в голове очереди, и удалить его. 
Если очередь пуста, то вывести «error».
put(x) — добавить число x в очередь
size() — вывести текущий размер очереди
Формат ввода
В первой строке записано количество команд n — целое число, не превосходящее 1000. 
В каждой из следующих n строк записаны команды по одной строке.

Формат вывода
Выведите ответ на каждый запрос по одному в строке.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;

class Queque {
    constructor(start = null, end = null) {
        this.start = start;
        this.end = end;
        this.counter = 0;
    }

    setSize(number) {
        this.maxNumber = number;
    }

    put(value) {
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

    get() {
        if(this.counter === 0) {
            return 'error';
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

    size() {
        return this.counter;
    }
}


const queqe = new Queque();

rl.on('line', (input) => {
    let string = input.split(' ');
    let comand = string[0];

    if(phase > 0) {
        switch (comand) {
            case 'put':
                let pushResult = queqe.put(string[1]);
                if(!pushResult) {
                    process.stdout.write(`error`);
                    process.stdout.write('\n');
                }
                break;
            case 'get':
                process.stdout.write(`${queqe.get()}`);
                process.stdout.write('\n');
                break;
            case 'size':
                process.stdout.write(`${queqe.size()}`);
                process.stdout.write('\n');
                break;
        }
    }
    phase++
});
