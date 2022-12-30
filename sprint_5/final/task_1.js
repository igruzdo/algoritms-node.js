/*
-- УСЛОВИЕ ЗАДАЧИ --
В данной задаче необходимо реализовать сортировку кучей. При этом кучу необходимо реализовать самостоятельно, использовать 
имеющиеся в языке реализации нельзя. Сначала рекомендуется решить задачи про просеивание вниз и вверх.

Тимофей решил организовать соревнование по спортивному программированию, чтобы найти талантливых стажёров. Задачи подобраны, 
участники зарегистрированы, тесты написаны. Осталось придумать, как в конце соревнования будет определяться победитель.

Каждый участник имеет уникальный логин. Когда соревнование закончится, к нему будут привязаны два показателя: количество решённых 
задач Pi и размер штрафа Fi. Штраф начисляется за неудачные попытки и время, затраченное на задачу.

Тимофей решил сортировать таблицу результатов следующим образом: при сравнении двух участников выше будет идти тот, у которого 
решено больше задач. При равенстве числа решённых задач первым идёт участник с меньшим штрафом. Если же и штрафы совпадают, то первым будет тот, у которого логин идёт раньше в алфавитном (лексикографическом) порядке.

Тимофей заказал толстовки для победителей и накануне поехал за ними в магазин. В своё отсутствие он поручил вам реализовать 
алгоритм сортировки кучей (англ. Heapsort) для таблицы результатов.



-- ПРИНЦИП РАБОТЫ --
Благодаря пройденному материалу и решенным задачкам с кучами перед началом необходимо подготовиься.
Реализуем 4 функции: просеивание вниз (shiftDown), просеивание вверх (shiftUp), добавление и удаление элемента из кучи.
Далее создадим компаратор для сравнения двух элементов кучи (взял его из 3го спринта).

Затем действия простые. С каждой введенной строкой вносим в массив кучи новый элемент и запускаем просеивание вверх.
Как только ввод закончен поочередно удаляем из кучи верхние элементы с предварительным просеиванием вниз.

Чтобы не занимать лишнюю память, сразу печатаем результат в потоке вывода, а не создаем отсортированный массив.



-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Учитывать процесс создания кучи не будем. Сортировка кучи занимает O(nlogn), так как для каждого элемента нам надо пройтись в худшем случае по высоте дерева h.
-- АСИМПТОТИЧЕСКАЯ СЛОЖНОСТЬ --
    Ассимптотическая сложность O(n), так как надо создать массив для кучи.
-- Посылка --
    https://contest.yandex.ru/contest/24810/run-report/80136600/
*/


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;

let numberOfParticipants = 0;
const heap = [];

/**
* @param {{ login: string, tasks: number, penalty: number }} firstItem - первый элемент
* @param {{ login: string, tasks: number, penalty: number }} secondItem - второй элемент
* @returns {boolean}
*/

function isFirstItemMostPriorited(firstItem, secondItem) {
    if(!secondItem) {
        return false;
    }
    if (firstItem.tasks > Number(secondItem.tasks)) {
       return true;
    } else if (firstItem.tasks === Number(secondItem.tasks)) {
        if (firstItem.penalty < Number(secondItem.penalty)) {
            return true;
        } else if (firstItem.penalty === Number(secondItem.penalty)) {
            if (firstItem.login < secondItem.login) {
                return true;
            } else { return false; }
        } else { return false; }
    } else { return false; }
}

rl.on('line', (input) => {
    if (phase === 0) {
        numberOfParticipants = parseInt(input);
    }
    
    if (phase > 0 && phase <= numberOfParticipants) {
        const arrItem = input.split(' ');
        const obj = {
            login: arrItem[0],
            tasks: Number(arrItem[1]),
            penalty: Number(arrItem[2]),
        }
        heapAdd(heap, obj);
    }
    phase++;
});

rl.on('close', () => {
    for(let i = 1; i <= numberOfParticipants; i++) {
        process.stdout.write(`${heapPop(heap).login}` + '\n');
    }
})

/**
* @param {{ login: string, tasks: number, penalty: number }[]} heap - куча
* @param {{ login: string, tasks: number, penalty: number }} data - элемент кучи
* @returns {void}
*/
function heapAdd(heap, data) {
    let idx;
    if(heap.length === 0) {
        idx = 1;
    } else {
        idx = heap.length;
    }
    heap[idx] = data;
    siftUp(heap, idx);
}

/**
* @param {{ login: string, tasks: number, penalty: number }[]} heap - куча
* @returns {{ login: string, tasks: number, penalty: number }}
*/

function heapPop(heap) {
    let item = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.pop();
    shiftDown(heap, 1);
    return item;
}

/**
* @param {{ login: string, tasks: number, penalty: number }[]} heap - куча
* @param {number} index - индекс элемента в куче
* @returns {{ login: string, tasks: number, penalty: number }}
*/

function siftUp(heap, index) {
    if(index === 1) {
        return;
    }
    let parentIdx = Math.floor(index / 2);
    if(isFirstItemMostPriorited(heap[index], heap[parentIdx])) {
        [heap[index], heap[parentIdx]] = [heap[parentIdx], heap[index]];
        siftUp(heap, parentIdx);
    } 
}

/**
* @param {{ login: string, tasks: number, penalty: number }[]} heap - куча
* @param {number} index - индекс элемента в куче
* @returns {{ login: string, tasks: number, penalty: number }}
*/

function shiftDown(heap, idx) {
    let left = 2 * idx;
    let right = 2 * idx + 1;
    let index_largest;

    if(heap.length - 1 < left) {
        return;
    }

    if(right <= heap.length - 1 && isFirstItemMostPriorited(heap[right], heap[left])) {
        index_largest = right;
    } else {
        index_largest = left;
    }

    if(isFirstItemMostPriorited(heap[index_largest], heap[idx])) {

        [heap[idx], heap[index_largest]] = [heap[index_largest], heap[idx]];
        shiftDown(heap, index_largest);
    }
}



