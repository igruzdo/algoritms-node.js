/*
-- УСЛОВИЕ ЗАДАЧИ --
Вася готовится к экзамену по алгоритмам и на всякий случай пишет шпаргалки.

Чтобы уместить на них как можно больше информации, он не разделяет слова пробелами. В итоге получается одна очень длинная строка. 
Чтобы на самом экзамене из-за нервов не запутаться в прочитанном, он просит вас написать программу, которая по этой длинной строке 
и набору допустимых слов определит, можно ли разбить текст на отдельные слова из набора.

Более формально: дан текст T и набор строк s1, ... ,sn. Надо определить, представим ли T как sk1sk2...skr, где где ki — индексы строк. 
Индексы могут повторяться. Строка si может встречаться в разбиении текста T произвольное число раз. Можно использовать не все строки
 для разбиения. Строки могут идти в любом порядке.

Формат ввода
В первой строке дан текст T, который надо разбить на слова. Длина T не превосходит 105. Текст состоит из строчных букв английского 
алфавита.

Во второй строке записано число допустимых к использованию слов 1 ≤ n ≤ 100.

В последующих n строках даны сами слова, состоящие из маленьких латинских букв. Длина каждого слова не превосходит 100.

Формат вывода
Выведите «YES», если текст можно разбить на слова из данного словаря, или «NO» в ином случае.

Пример 1
Ввод	
examiwillpasstheexam
5
will
pass
the
exam
i
Вывод
YES

Пример 2
Ввод	
abacaba
2
abac
caba
Вывод
NO

Пример 3
Ввод	
abacaba
3
abac
caba
aba
Вывод
YES


-- ПРИНЦИП РАБОТЫ --
	1) Сначала создаем префиксное дерево, в котором каждый узел имеет ссылку на следующую букву и имеет флаг терминального узла.
  2) Далее с помощью динамического подхода мы последовательно проходим по каждому символу строки.
  3) Сначала создаем массив длины n + 1, где n - длина слова, и заполняем его false, кроме первого элемента, 
  так как префикс пустой строки это true.
  4) На каждой итерации идем от корня дерева посимвольно. Если у узла нет потомка с таким символом, то цикл прерывается и перходим к 
  следующей букве. Еслт есть, то идем дальше по цепочке потомков. В конце слова из словаря, если символ является терминальным, то в соответствующую
  ячейку записываем true и тогда следующий символ будет началом нового цикла от корня дерева.
  5) Итоговый ответ получим, когда дойдем до конца слова. Если совпадет, что последний символ является терминальным узлом, то возвращаем true,
  если нет, то false.



-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
	O(n*m), где n - количество слов в словаре, m - длина заданной строки.
-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
	O(n), где n - длина всех слов в словаре.
-- Посылка --
	https://contest.yandex.ru/contest/26133/run-report/82756312/
*/

/**
 * класс является базовым узлом дерева.
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

/**
 * префиксное дерево
 */

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  /**
   * @param {string} word - слово для добавления в словарь дерева
   * @returns {void}
   */
  insert(word) {
    let current = this.root;
    for (const ch of word) {
      if (!current.children[ch]) {
        current.children[ch] = new TrieNode();
      }
      current = current.children[ch];
    }
    current.isEndOfWord = true;
  }
}

/**
 * функция, отвечающая на вопрос можно ли разбить строку на подстроки
 * @param {string[]} dictionary - массив строк для создания префиксного дерева
 * @param {string} word - слово, которое проверяется на возможность разбиения
 * @returns {boolean}
 */
function canSplitWord(dictionary, word) {
  const n = word.length;
  const trie = new Trie();

  for (const word of dictionary) {
    trie.insert(word);
  }
  
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  
  for (let i = 0; i < n; i++) {
    if (dp[i] === false) {
      continue;
    }
    
    let current = trie.root;
    for (let j = i; j < n; j++) {
      const ch = word.charAt(j);

      if (!current.children[ch]) {
        break;
      }
      current = current.children[ch];

      if (current.isEndOfWord) {
        if (j === n - 1) {
          return true;
        }
        dp[j + 1] = true;
      }
    }
  }
  
  return false;
}

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
});

let mainStr;
let numberOfSubstrings;
let phase = 0;
let strCount = 0;
let dictionary = [];
let trueMessage = 'YES';
let falseMessage = 'NO';

rl.on("line", (input) => {

	if (phase > 0 && strCount < numberOfSubstrings) {
		dictionary.push(input);
		strCount++;
	}

    if (phase === 1) {
		numberOfSubstrings = +input;
		phase++
	}

	if (phase === 0) {
		mainStr = input;
		phase++
	}

	if (strCount === numberOfSubstrings) {
		rl.emit("close");
	}
});

rl.on("close", () => {
  const result = canSplitWord(dictionary, mainStr)
  process.stdout.write(result ? trueMessage : falseMessage);
});


