//Дана матрица. Нужно написать функцию, которая для элемента возвращает всех его соседей. 
// Cоседним считается элемент, находящийся от текущего на одну ячейку влево, вправо, вверх или вниз. 
// Диагональные элементы соседними не считаются.
// [
//   [1, 2, 3]
//   [0, 2, 6]
//   [7, 4, 1]
//   [2, 7, 0]
//]
// Например, в матрице A соседними элементами для (0, 0) будут 2 и 0. А для (2, 1) –— 1, 2, 7, 7.

//В первой строке задано n — количество строк матрицы. Во второй — количество столбцов m. Числа m и n не превосходят 1000. 
// В следующих n строках задана матрица. Элементы матрицы — целые числа, по модулю не превосходящие 1000. 
// В последних двух строках записаны координаты элемента, соседей которого нужно найти. Индексация начинается с нуля.


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

let inputFases;
let faseNumber = 0;

let neighbors = [];
let rowsNumber;
let collumnsNumber;
let arrray = [];
let y;
let x;

rl.on('line', (input) => {

  switch (faseNumber) {
    case 0:
      rowsNumber = parseInt(input);
      inputFases = 4 + rowsNumber;
      faseNumber++;
      return;
    case 1:
      collumnsNumber = parseInt(input);
      faseNumber++;
      return;
    case 2 + rowsNumber:
      y = parseInt(input);
      faseNumber++;
      return;
    case 3 + rowsNumber:
      x = parseInt(input);
      faseNumber++;
      return;
  }

  if (faseNumber > 1 && faseNumber <= 1 + rowsNumber) {
    arrray.push(input.split(" "))
    faseNumber++
    return
  }
});

rl.on('close', () => {
  y === 0 ? null : neighbors.push(parseInt(arrray[y - 1][x]));
  x === 0 ? null : neighbors.push(parseInt(arrray[y][x - 1]));
  ((y + 1) >= rowsNumber) ? null : neighbors.push(parseInt(arrray[y + 1][x]));
  ((x + 1) >= collumnsNumber) ? null : neighbors.push(parseInt(arrray[y][x + 1]));

  process.stdout.write(neighbors.sort((a, b) => a - b).join(' '));
})