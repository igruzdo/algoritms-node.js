/*Тимофей ищет место, чтобы построить себе дом. Улица, на которой он хочет жить, имеет длину n, то есть состоит из n 
одинаковых идущих подряд участков. Каждый участок либо пустой, либо на нём уже построен дом.

Общительный Тимофей не хочет жить далеко от других людей на этой улице. Поэтому ему важно для каждого участка 
знать расстояние до ближайшего пустого участка. Если участок пустой, эта величина будет равна нулю — расстояние до самого себя.

Помогите Тимофею посчитать искомые расстояния. Для этого у вас есть карта улицы. Дома в городе Тимофея нумеровались 
в том порядке, в котором строились, поэтому их номера на карте никак не упорядочены. Пустые участки обозначены нулями.

Формат ввода
В первой строке дана длина улицы —– n (1 ≤ n ≤ 106). В следующей строке записаны n целых неотрицательных чисел — 
номера домов и обозначения пустых участков на карте (нули). Гарантируется, что в последовательности есть хотя бы один ноль. 
Номера домов (положительные числа) уникальны и не превосходят 109.

Формат вывода
Для каждого из участков выведите расстояние до ближайшего нуля. Числа выводите в одну строку, разделяя их пробелами.

Пример 1
Ввод	Вывод
5
0 1 4 9 0
Вывод
0 1 2 1 0

основная идея - найти соседей между двумя пустыми участками, разделить их количество пополам и заменить номера домов 
расстоянием слева направо от минимума до максимума и от максимума до минимума (пирамида). Таким образом мы максимум пройдемся в 
по массиву 2 раза - 1 раз для поиска пустых участков, 2 раз для перезаписи номеров домов на расстояния,
и не будем хранить в памяти дополнительный массив с растояниями.

ссылка на отчет в контесте https://contest.yandex.ru/contest/22450/run-report/72961262/
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let arrayOfArea;

rl.on('line', (input) => {
    if (phase === 1) {
        arrayOfArea = input.split(" ");
    }
    phase++
});

rl.on('close', () => {
    let prevEmptyAreaNumber;
    let maximumDistance;
    for(let i = 0; i < arrayOfArea.length; i++) {
        //граничный случай, если пустой участок идет первым в массиве
        if(arrayOfArea[i] === "0" && i === 0) {
            prevEmptyAreaNumber = 0;
            continue;
        }
        //граничный случай, когда встречаем первый пустой участок
        if(arrayOfArea[i] === "0" && prevEmptyAreaNumber === undefined) {
            prevEmptyAreaNumber = i;
            for(let j = 0; j < i; j++) {
                arrayOfArea[j] = `${i - j}`
            }
            continue;
        }
        //граничный случай, когда в конце массива нет пустого участка
        if(i === arrayOfArea.length - 1 && arrayOfArea[i] !== '0') {
            for(let j = 1; (prevEmptyAreaNumber + j) < arrayOfArea.length; j++) {
                arrayOfArea[prevEmptyAreaNumber + j] = `${j}`;
            }
            continue;
        }
        //остальные типичные случаи, когда пустой участок где-то в середине массива
        if(arrayOfArea[i] === "0" && prevEmptyAreaNumber >= 0) {
            //находим середину между двумя пустыми участками и округляем в большую сторону
            maximumDistance = Math.ceil((i - prevEmptyAreaNumber - 1) / 2);
            let maximumDistanceIsEven = (i - prevEmptyAreaNumber - 1) % 2 === 0

            for(let j = 1; j + prevEmptyAreaNumber < i; j++) {
                if((maximumDistanceIsEven && j <= maximumDistance) || (!maximumDistanceIsEven && j < maximumDistance)) {
                    arrayOfArea[prevEmptyAreaNumber + j] = `${j}`;
                } else {
                    arrayOfArea[prevEmptyAreaNumber + j] = `${i - prevEmptyAreaNumber - j}`
                }
            }
            prevEmptyAreaNumber = i;
        }
    }
    process.stdout.write(arrayOfArea.join(' '));
})