/*
-- УСЛОВИЕ ЗАДАЧИ --
Вам даны строки в запакованном виде. Определим запакованную строку (ЗС) рекурсивно. Строка, состоящая только из 
строчных букв английского алфавита является ЗС. Если A и B —– корректные ЗС, то и AB является ЗС. Если A —– ЗС, 
а n — однозначное натуральное число, то n[A] тоже ЗС. При этом запись n[A] означает, что при распаковке строка 
A записывается подряд n раз. Найдите наибольший общий префикс распакованных строк и выведите его (в распакованном виде).

Иными словами, пусть сложение —– это конкатенация двух строк, а умножение строки на число — повтор строки 
соответствующее число раз. Пусть функция f умеет принимать ЗС и распаковывать её. Если ЗС D имеет вид D=AB, где A и 
B тоже ЗС, то f(D) = f(A) + f(B). Если D=n[A], то f(D) = f(A) × n.

Формат ввода
В первой строке записано число n (1 ≤ n ≤ 1000) –— число строк.

Далее в n строках записаны запакованные строки. Гарантируется, что эти строки корректны, то 
есть удовлетворяют указанному рекурсивному определению. Длина строк после распаковки не превосходит 105.

Формат вывода
Выведите наибольший общий префикс распакованных строк.

Пример 1
Ввод	
3
2[a]2[ab]
3[a]2[r2[t]]
a2[aa3[b]]
Вывод
aaa

Пример 2
Ввод	
3
abacabaca
2[abac]a
3[aba]
Вывод
aba


-- ПРИНЦИП РАБОТЫ --
	Сначала выполняем распаковку строки - простая функция перебора со скобочками.
	Далее выполняем поиск наибольшего префикса. Посик осуществляется бинарным поиском по всему списку строк. Чтобы
	максимально уменьшить время исполнения, еще на этапе ввода данных определяется самая короткая строка, которая и будет максимальой правой
	границей для бинарного поиска. Далее поочередно проверяются префиксы каждой строки. Если префиксы не совпадают, то цикл прерывается
	и запускается заново с новыми параметрами левой, правой границ и середины.



-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
	O(n*Log(m)), где n - количество строк, m - длина самой короткой строки.
-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
	O(n), где n - количество строк
-- Посылка --
	https://contest.yandex.ru/contest/26133/run-report/82624795/
*/

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
});

let strings = [];
let phase = 0;
let numberOfStrings;
let strCount = 0;
let minStrLength;
let maxStrLength;

rl.on("line", (input) => {

	if (phase > 0 && strCount < numberOfStrings) {
		let str = depackString(input);

		if (strCount === 0) {
			minStrLength = str.length;
			maxStrLength = str.length;
		} else {
			minStrLength = minStrLength < str.length ? minStrLength : str.length;
			maxStrLength = maxStrLength > str.length ? maxStrLength : str.length;
		}

		strings.push(str);
		strCount++;
	}

	if (phase === 0) {
		numberOfStrings = +input;
		phase++
	}

	if (strCount === numberOfStrings) {
		rl.emit("close");
	}
});

rl.on("close", () => {
	let res = findBiggestPrefix(strings);
	process.stdout.write(`${res}` + "\n");
});

/**
* @param {string} str - запакованная строка
* @returns {string}
*/

function depackString(str) {
	const stack = [];
	let currCount = '';
	let currStr = '';

	for (let i = 0; i < str.length; i++) {
		const char = str[i];

		if (char === '[') {
			stack.push(currStr);
			stack.push(parseInt(currCount));
			currStr = '';
			currCount = '';

		} else if (char === ']') {
			const count = stack.pop();
			const prevStr = stack.pop();
			currStr = prevStr + currStr.repeat(count);

		} else if (parseInt(char) >= 0) {
			currCount += char;

		} else {
			currStr += char;
		}
	}

	return currStr;
}


/**
* @param {string[]} strs - массив строк
* @returns {string}
*/

function findBiggestPrefix(strs) {
	let prefixLength = 0;
	if (strs.length === 1) {
		return strs[0];
	}

	let left = 0;
	let right = minStrLength + 1;

	while (right - left > 1) {
		const mid = Math.floor((left + right) / 2);
		const prefixOne = strs[0].slice(0, mid - 1);
		let match = true;

		for (let i = 0; i < strs.length - 1; i++) {
			if (prefixOne !== strs[i + 1].slice(0, mid - 1)) {
				match = false;
				right = mid;
				break;
			}
		}

		if (match) {
			prefixLength = mid;
			left = mid;
		}
	}

	if (prefixLength > 0 && prefixLength < maxStrLength) {
		return strs[0].slice(0, prefixLength - 1);

	} else if (prefixLength === maxStrLength) {
		return strings[0];

	} else {
		return "";
	}
}