/*
Алла придумала новый способ сравнивать две строки: чтобы сравнить строки a и b, в них надо оставить 
только те буквы, которые в английском алфавите стоят на четных позициях. Затем полученные строки 
сравниваются по обычным правилам. Помогите Алле реализовать новое сравнение строк.

Формат ввода
На вход подаются строки a и b по одной в строке. Обе строки состоят из маленьких латинских букв, 
не бывают пустыми и не превосходят 105 символов в длину.

Формат вывода
Выведите -1, если a < b, 0, если a = b, и 1, если a > b.

Пример 1
Ввод	
gggggbbb
bbef
Вывод
-1

Пример 2
Ввод	
z
aaaaaaa
Вывод
1

Пример 3
Ввод	
ccccz
aaaaaz
Вывод
0
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let x;
let y;
let phase = 0;

rl.on("line", (input) => {
  if (phase === 1) {
    x = input.split("").filter(item => item.charCodeAt() % 2 === 0).join('');
  }

  if (phase === 3) {
    y = input.split("").filter(item => item.charCodeAt() % 2 === 0).join('');
  }

  if (phase === 3) {
    rl.emit("close");
  }
  phase++;
});

rl.on("close", () => {


	if(x < y) {
		process.stdout.write(`-1` + "\n");
	} else if(x === y) {
		process.stdout.write(`0` + "\n");
	} else {
		process.stdout.write(`1` + "\n");
	}
});