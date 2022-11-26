/*
-- УСЛОВИЕ ЗАДАЧИ --
Тимофей решил организовать соревнование по спортивному программированию, чтобы найти талантливых стажёров. Задачи подобраны, участники зарегистрированы, тесты написаны. 
Осталось придумать, как в конце соревнования будет определяться победитель.

Каждый участник имеет уникальный логин. Когда соревнование закончится, к нему будут привязаны два показателя: количество решённых задач Pi и размер штрафа Fi. 
Штраф начисляется за неудачные попытки и время, затраченное на задачу.

Тимофей решил сортировать таблицу результатов следующим образом: при сравнении двух участников выше будет идти тот, у которого решено больше задач. При равенстве 
числа решённых задач первым идёт участник с меньшим штрафом. Если же и штрафы совпадают, то первым будет тот, у которого логин идёт раньше в алфавитном (лексикографическом) 
порядке.

Тимофей заказал толстовки для победителей и накануне поехал за ними в магазин. В своё отсутствие он поручил вам реализовать алгоритм быстрой сортировки (англ. quick sort) 
для таблицы результатов. Так как Тимофей любит спортивное программирование и не любит зря расходовать оперативную память, то ваша реализация сортировки не может потреблять 
O(n) дополнительной памяти для промежуточных данных (такая модификация быстрой сортировки называется "in-place").

Как работает in-place quick sort
Как и в случае обычной быстрой сортировки, которая использует дополнительную память, необходимо выбрать опорный элемент (англ. pivot), а затем переупорядочить массив. 
Сделаем так, чтобы сначала шли элементы, не превосходящие опорного, а затем —– большие опорного.

Затем сортировка вызывается рекурсивно для двух полученных частей. Именно на этапе разделения элементов на группы в обычном алгоритме используется дополнительная память. 
Теперь разберёмся, как реализовать этот шаг in-place.

Пусть мы как-то выбрали опорный элемент. Заведём два указателя left и right, которые изначально будут указывать на левый и правый концы отрезка соответственно. 
Затем будем двигать левый указатель вправо до тех пор, пока он указывает на элемент, меньший опорного. Аналогично двигаем правый указатель влево, пока он стоит на 
элементе, превосходящем опорный. В итоге окажется, что что левее от left все элементы точно принадлежат первой группе, а правее от right — второй. Элементы, на которых 
стоят указатели, нарушают порядок. Поменяем их местами (в большинстве языков программирования используется функция swap()) и продвинем указатели на следующие элементы. 
Будем повторять это действие до тех пор, пока left и right не столкнутся.
На рисунке представлен пример разделения при pivot=5. Указатель left — голубой, right — оранжевый.

Формат ввода
В первой строке задано число участников n, 1 ≤ n ≤ 100 000.
В каждой из следующих n строк задана информация про одного из участников.
i-й участник описывается тремя параметрами:

уникальным логином (строкой из маленьких латинских букв длиной не более 20)
числом решённых задач Pi
штрафом Fi
Fi и Pi — целые числа, лежащие в диапазоне от 0 до 109.
Формат вывода
Для отсортированного списка участников выведите по порядку их логины по одному в строке.

Пример 1
Ввод	Вывод
5
alla 4 100
gena 6 1000
gosha 2 90
rita 2 90
timofey 4 80

Вывод
gena
timofey
alla
gosha
rita
Пример 2
Ввод	
5
alla 0 0
gena 0 0
gosha 0 0
rita 0 0
timofey 0 0

Вывод
alla
gena
gosha
rita
timofey

-- ПРИНЦИП РАБОТЫ --
Принцип работы простой, как при быстрой сортировке, но в связи с необходимостью проверки элемента по дополнительным условиям, то пришлось сделать условные блоки глубже.
Если равно количество решеных задач, то далее проверяем штраф. Если и штрафы равны, то дальше вглубь сравниваются имена.
Если ни один индикатор не продвинулся, то меняем элементы местами.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

     O(nlogn) - это обычная сложность быстрой сортировки.

-- АСИМПТОТИЧЕСКАЯ СЛОЖНОСТЬ --

    Асимптотическая сложность O(n), так как мы не копируются элементы массива, а вырезаются и вставляются.

-- Посылка --
    https://contest.yandex.ru/contest/23815/run-report/76487704/
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;

let arrayOfParticipants = [];
let numberOfParticipants = 0;

rl.on('line', (input) => {
    if (phase === 0) {
        numberOfParticipants = parseInt(input);
    }
    if (phase > 0 && phase <= numberOfParticipants) {
        arrayOfParticipants.push(input.split(' '));
    } 

    phase++
});

function sort(array) {

    if (array.length === 1) {
        return [array[0][0]];
    } else if (array.length === 0) {
        return [];
    }

    let supportElementIdx = Math.floor((array.length - 1) / 2)
    let supportElement = array.splice(supportElementIdx, 1)[0];
    let leftIndicator = 0;
    let isLeftStop = false;
    let rightIndicator = array.length - 1;
    let isRightStop = false;

    while (leftIndicator <= rightIndicator) {

        //условные блоки левого указателя
        if (Number(array[leftIndicator][1]) > Number(supportElement[1])) {
            leftIndicator++;
        } else if (Number(array[leftIndicator][1]) === Number(supportElement[1])) {
            if (Number(array[leftIndicator][2]) < Number(supportElement[2])) {
                leftIndicator++;
            } else if (Number(array[leftIndicator][2]) === Number(supportElement[2])) {
                if (array[leftIndicator][0] < supportElement[0]) {
                    leftIndicator++;
                } else { isLeftStop = true }
            } else { isLeftStop = true }
        } else { isLeftStop = true }

        //условные блоки правого указателя
        if (Number(array[rightIndicator][1]) < Number(supportElement[1])) {
            rightIndicator--;
        } else if (Number(array[rightIndicator][1]) === Number(supportElement[1])) {
            if (Number(array[rightIndicator][2]) > Number(supportElement[2])) {
                rightIndicator--;
            } else if (Number(array[rightIndicator][2]) === Number(supportElement[2])) {
                if (array[rightIndicator][0] > supportElement[0]) {
                    rightIndicator--;
                } else { isRightStop = true }
            } else { isRightStop = true }
        } else { isRightStop = true }

        //условный блок, если левый и правый указатель остановили движение
        if (isRightStop && isLeftStop) {
            [array[leftIndicator], array[rightIndicator]] = [array[rightIndicator], array[leftIndicator]];
            isLeftStop = false;
            isRightStop = false;
        }
    }
    
    let arrayLeft = array.splice(0, leftIndicator);
    let arrayRight = array.splice(0);
    return [...sort(arrayLeft), supportElement[0], ...sort(arrayRight)];
}


rl.on('close', () => {
    sort(arrayOfParticipants).forEach(item => {
        process.stdout.write(`${item}` + '\n');
    })
})