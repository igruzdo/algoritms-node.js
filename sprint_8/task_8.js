/*
Напишите программу, которая будет заменять в тексте все вхождения строки s на строку t. Гарантируется, 
что никакие два вхождения шаблона s не пересекаются друг с другом.

Формат ввода
В первой строке дан текст —– это строка из строчных букв английского алфавита, длина которой не превышает 106.

Во второй строке записан шаблон s, вхождения которого будут заменены.

В третьей строке дана строка t, которая будет заменять вхождения.

Обе строки s и t состоят из строчных букв английского алфавита, длина каждой строки не превосходит 105. 
Размер итоговой строки не превосходит 2⋅ 106.

Формат вывода
В единственной строке выведите результат всех замен — текст, в котором все вхождения s заменены на t.

Пример 1
Ввод	
pingpong
ng
mpi
Вывод
pimpipompi

Пример 2
Ввод	
aaa
a
ab
Вывод
ababab
*/

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
});

let p;
let text;
let past;
let phase = 0;

rl.on("line", (input) => {
  if (phase === 0) {
    text = input;
  }

  if (phase === 1) {
    p = input;
  }

  if (phase === 2) {
    past = input;
  }

  if (phase === 2) {
    rl.emit("close");
  }
  phase++;
});

rl.on("close", () => {
  const s = p + "#" + text;
  let result = [];
	let resStr = '';
  const pi = Array(p.length).fill(0);
  let piPrev = 0;
  for (let i = 1; i < s.length; i++) {
    let k = piPrev;

    while (k > 0 && s[k] !== s[i]) {
      k = pi[k - 1];
    }

		if(s[k] === s[i]) {
      k += 1
    }


		if(i < p.length) {
			pi[i] = k;
		}

		piPrev = k;

		if(k === p.length) {
			result.push(i - 2 * p.length)
		}

  }

	let prevIdx = 0;

	if(result.length > 0) {
		result.forEach((n, idx) => {
			if(idx === 0) {
				resStr += text.slice(0, n);
				resStr += past;
			} else {
	
				resStr += text.slice(result[idx - 1] + p.length, n);
				resStr += past;
			}
			prevIdx = n;
		})
	
		if(resStr.length < text.length - result.length * p.length + past.length * result.length) {
			resStr += text.slice(prevIdx + p.length)
		}
	
		process.stdout.write(`${resStr}` + "\n");
	} else {
		process.stdout.write(`${text}` + "\n");
	}
});
