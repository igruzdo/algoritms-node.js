/*
-- УСЛОВИЕ ЗАДАЧИ --
Гоша реализовал структуру данных Дек, максимальный размер которого определяется заданным числом. Методы push_back(x), 
push_front(x), pop_back(), pop_front() работали корректно. Но, если в деке было много элементов, программа работала 
очень долго. Дело в том, что не все операции выполнялись за O(1). Помогите Гоше! Напишите эффективную реализацию.

Внимание: при реализации используйте кольцевой буфер.

-- ПРИНЦИП РАБОТЫ --
Так как добавлять в массив новый элемент это трудная задача в связи с необхлдимостью смещения всех элементов,
я использовал двусвязанный список.
В классе есть поля: 
- start - первый элемент очередиб
- end - последний
- maxNumber - максимальный размер очереди
- counter - количество элементов в очереди.

В очереди объекты с тремя полями: prev, next, value.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Добавление и извлечение будет за О(1)

-- Посылка --
https://contest.yandex.ru/contest/22781/submits/

*/





const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;

class QuequeDeck {
    constructor(start = null, end = null, number = 0) {
        this.start = start;
        this.end = end;
        this.maxNumber = number;
        this.counter = 0;
    }

    setSize(number) {
        this.maxNumber = number;
    }

    push_back(value) {
        if(this.counter + 1 > this.maxNumber) {
            return 'error';
        }

        if(this.start && this.end) {
            let newItem = {
                value,
                prev: null,
                next: this.end,
            }
            this.end.prev = newItem;
            this.end = newItem;
            this.counter++;
        } else {
            let newItem = {
                value,
                prev: null,
                next: null,
            }
            this.end = newItem;
            this.start = newItem;
            this.counter++;
        }
    }

    push_front(value) {
        if(this.counter + 1 > this.maxNumber) {
            return 'error';
        }

        if(this.start && this.end) {
            let newItem = {
                value,
                prev: this.start,
                next: null,
            }
            this.start.next = newItem;
            this.start = newItem;
            this.counter++;
        } else {
            let newItem = {
                value,
                prev: null,
                next: null,
            }
            this.end = newItem;
            this.start = newItem;
            this.counter++;
        }
    }


    pop_front() {
        if(this.counter === 0) {
            return 'error';
        }

        if(this.counter === 1) {
            let value = this.start.value;
            this.start = null;
            this.end = null;
            this.counter--;
            return `${value}`;
        } else {
            let value = this.start.value;
            this.start = this.start.prev;
            this.start.next = null;
            this.counter--;
            return `${value}`;
        }
    }

    pop_back() {
        if(this.counter === 0) {
            return 'error';
        }

        if(this.counter === 1) {
            let value = this.start.value;
            this.start = null;
            this.end = null;
            this.counter--;
            return `${value}`;
        } else {
            let value = this.end.value;
            this.end = this.end.next;
            this.end.prev = null;
            this.counter--;
            return `${value}`;
        }
    }
}


const queqe = new QuequeDeck();

rl.on('line', (input) => {
    let string = input.split(' ');
    let comand = string[0];

    if(phase === 1) {
        queqe.setSize(parseInt(input));
        phase++;
    }

    if(phase > 1) {
        switch (comand) {
            case 'push_front':
                let errorFront = queqe.push_front(string[1]);
                if(errorFront) {
                    process.stdout.write(errorFront);
                    process.stdout.write('\n');
                }
                break;
            case 'push_back':
                let errorBack = queqe.push_back(string[1]);
                if(errorBack) {
                    process.stdout.write(errorBack);
                    process.stdout.write('\n');
                }
                break;
            case 'pop_front':
                process.stdout.write(`${queqe.pop_front()}`);
                process.stdout.write('\n');
                break;
            case 'pop_back':
                process.stdout.write(`${queqe.pop_back()}`);
                process.stdout.write('\n');
                break;
        }
    }

    if(phase === 0) {
        phase++;
    }
});
