/*
В этой задаче вам необходимо посчитать префикс-функцию для заданной строки.

Формат ввода
На вход подаётся строка, состоящая из строчных латинских букв. Длина строки не превосходит 106.

Формат вывода
Если длина входной строки L, то выведите через пробел L целых неотрицательных чисел —– массив значений префикс-функции исходной строки.

Пример 1
Ввод	
abracadabra
Вывод
0 0 0 1 0 1 0 1 2 3 4 

Пример 2
Ввод	
xxzzxxz
Вывод
0 1 0 0 1 2 3

Пример 3
Ввод	
aaaaa
Вывод
0 1 2 3 4 
*/

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

let str;
let phase = 0;

rl.on("line", (input) => {
  if (phase === 0) {
    str = input.split("");
  }

  if (phase === 0) {
    rl.emit("close");
  }
  phase++;
});

rl.on("close", () => {

  const p = Array(str.length).fill(0);
  
  for(let i = 1; i < str.length; i++) {
    let k = p[i - 1];
    while(k > 0 && str[k] !== str[i]) {
      k = p[k - 1];
    }
    if(str[k] === str[i]) {
      k += 1
    }
    p[i] = k;
  }

  process.stdout.write(`${p.join(' ')}` + "\n");

});