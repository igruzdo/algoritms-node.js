/*
-- УСЛОВИЕ ЗАДАЧИ --
Тимофей, как хороший руководитель, хранит информацию о зарплатах своих сотрудников в базе данных и постоянно её обновляет. 
Он поручил вам написать реализацию хеш-таблицы, чтобы хранить в ней базу данных с зарплатами сотрудников.

Хеш-таблица должна поддерживать следующие операции: 

put key value —– добавление пары ключ-значение. Если заданный ключ уже есть в таблице, то соответствующее ему значение 
обновляется. 
get key –— получение значения по ключу. Если ключа нет в таблице, то вывести «None». Иначе вывести найденное значение. 
delete key –— удаление ключа из таблицы. Если такого ключа нет, то вывести «None», иначе вывести хранимое по данному 
ключу значение и удалить ключ.
В таблице хранятся уникальные ключи.

Требования к реализации: 

Нельзя использовать имеющиеся в языках программирования реализации хеш-таблиц (std::unordered_map в С++, dict в Python, 
    HashMap в Java, и т. д.)
Разрешать коллизии следует с помощью метода цепочек или с помощью открытой адресации.
Все операции должны выполняться за O(1) в среднем.
Поддерживать рехеширование и масштабирование хеш-таблицы не требуется.
Ключи и значения, id сотрудников и их зарплата, —– целые числа. Поддерживать произвольные хешируемые типы не требуется.
Формат ввода
В первой строке задано общее число запросов к таблице n (1≤ n≤ 106).

В следующих n строках записаны запросы, которые бывают трех видов –— get, put, delete —– как описано в условии.

Все ключи и значения –— целые неотрицательные числа, не превосходящие 109.

При любой последовательности команд, количество ключей в хеш-таблице не может превышать 105.

Формат вывода
На каждый запрос вида get и delete выведите ответ на него в отдельной строке.

Пример 1
Ввод	
10
get 1
put 1 10
put 2 4
get 1
get 2
delete 2
get 2
put 1 5
get 1
delete 2

Вывод
None
10
4
4
None
5
None

Пример 2
Ввод	
8
get 9
delete 9
put 9 1
get 9
put 9 2
get 9
put 9 3
get 9

Вывод
None
None
1
2
3

-- ПРИНЦИП РАБОТЫ --
    Исходя из условия задачи у нас может быть 10^5 степени элементов в хэштаблице.
    Метод хэширования выбираем полиномный по методу Горнера.
    Структура слудующая: объект, где ключ - хэш, значение - однонаправленный список, который призван решить проблему коллизии методом цепочек. 
    Выбрал его так как он самый простой в реализации.
    В качестве модуля выбрано простое число 1000003.
    Для коэфициента q выбрано простое число из учебника 1000000007, которое достаточно большое.

    В остальном всё работает довольно приметивно:
        - получаем ключ-значение,
        - хэшируем ключ
        - создаем по ключу хэша в таблице экземпляр класса однонаправленного списка и записываем значение.
        - если по данному хэшу уже есть очередь, то придется пробежаться по всему списку и проверить значение каждого элемента на наличие дубля. Если есть дубль, то обновляем значение, если нет, то записываем
        в очередь новое значение.
      
        - принцип в пункте выше также работает при удалении элемента - в случае наличии в списке более одного элемента, то пробегаемся по ней и удаляем нужный ключ, иначе просто проверяем значение
        и, если оно совпадает с ключом пользовательского запроса, то удаляем.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Так как я выбрал максимальное значение модуля из условия по модулю, то процесс добавления, чтения и удаления должен быть О(1) при отсутсвии коллийзий.
    Если колизии есть, то O(n), где n - количество элементов в списке. Однако я думаю, что такое маловероятно, либо список будет минимальным. Также можно увеличить модуль в 2 раза, тогда коллизий будет еще меньше. 
-- АСИМПТОТИЧЕСКАЯ СЛОЖНОСТЬ --
    Асимптотическая сложность O(n). Нужно на каждый элемент создавать отдельное ключ-значение в хэш-таблице или объект в списке.
-- Посылка --
    https://contest.yandex.ru/contest/24414/run-report/78965024/
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;

const hashTable = {};

class List {
    constructor(end = null) {
        this.end = end;
        this.counter = 0;
    }

    initList(key, value) {
        let newItem = {
            objValue: {
                key,
                value
            },
            prev: null,
        }
        this.end = newItem
        this.counter++
    }

    put(key, value) {
        if(this.end) {
            let checkValue = this.end;

            for(let i = 1; i <= this.counter; i++) {
                if(checkValue?.objValue?.key === key) {
                    checkValue.objValue = {
                        key,
                        value
                    };
                    return;
                } else {
                    checkValue = checkValue.prev;
                }
            }

            if(checkValue === null) {
                let newItem = {
                    objValue: {
                        key,
                        value
                    },
                    prev: this.end,
                }
                this.end = newItem
                this.counter++
            }
        } else {
            this.initList(key, value)
        }
    }

    get(key) {
        if(this.counter === 0) return 'None';

        if(this.counter === 1) {
            return this.end.objValue.key === key ? this.end.objValue.value : 'None';
        } else {
            let checkValue = this.end;

            for(let i = 1; i <= this.counter; i++) {
                if(checkValue?.objValue?.key === key) {
                    return checkValue.objValue.value;
                } else {
                    checkValue = checkValue.prev;
                }
            }
            return "None";
        }
    }

    delete(key) {
        if(this.counter === 0)  return 'None';

        if(this.counter === 1) {
            const value = this.end.objValue.value;
            this.end = null;
            this.counter = 0;
            return value;
        } else {
            let checkValue = this.end;

            for(let i = 1; i <= this.counter; i++) {
                if(checkValue.prev?.objValue?.key === key) {
                    checkValue.prev = checkValue.prev.prev;
                    const value = checkValue.prev?.objValue?.value
                    return value;
                } else {
                    checkValue = checkValue.prev;
                }
            }
            return 'None';
        }
    }

    getSize() {
        return this.counter;
    }
}

function getHash(stringData) {
    let str = [...stringData];

    if(str.length === 2) {
        summ = str[0].charCodeAt(0) * 1000000007 + str[1].charCodeAt(0);
        return summ % 1000003;
    }

    if(str.length === 1) return str[0].charCodeAt(0) % 1000003;

    summ = str[0].charCodeAt(0) * 1000000007 + str[1].charCodeAt(0);

    for(let i = 2; i < str.length; i++) {
        summ = (summ % 1000003) * 1000000007 + str[i].charCodeAt(0);
    }
    let hash = summ % 1000003;
    return hash;
}

rl.on('line', (input) => {
    if (phase > 0) {
        let commandInput = input.split(' ');
        const hash = getHash(commandInput[1]);

        switch (commandInput[0]) {
            case 'put':
                if(hashTable[hash]) {
                    const list = hashTable[hash];
                    list.put(commandInput[1], commandInput[2]);
                } else {
                    const list = new List();
                    list.put(commandInput[1], commandInput[2]);
                    hashTable[hash] = list;
                }
                break;
            case 'get':
                if(hashTable[hash]) {
                    const list = hashTable[hash];
                    const value = list.get(commandInput[1]);
                    process.stdout.write(`${value}` + '\n');
                } else {
                    process.stdout.write(`None` + '\n');
                }
                break;
            case 'delete':
                if(hashTable[hash]) {
                    const list = hashTable[hash];
                    const result = list.delete(commandInput[1]);
                    if(result) {
                        process.stdout.write(`${result}` + '\n');
                    }
                    if(list.getSize() === 0) {
                        delete hashTable[hash];
                    }
                } else {
                    process.stdout.write(`None` + '\n');
                }
                break;
        }
    }
    phase++
});