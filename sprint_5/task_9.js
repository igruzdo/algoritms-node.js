/**
 * Ребятам стало интересно, сколько может быть различных деревьев поиска, содержащих в своих узлах все уникальные числа от 1 до n. 
 * Помогите им найти ответ на этот вопрос.
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

rl.on('line', (input) => {
    const res = catalan(parseInt(input));
    process.stdout.write(`${res}`);
});

function catalan(n) {
  let answer = 1;
  if (n === 0 || n === 1){
    return answer;
  } else {
    let firstFactorial = 0;
    let secondFactorial = 0;
    let theerdFactorial = 0;

    for(let i = 1; i <= 2 * n; i++){
      answer = answer * i;
      if(i === n) {
        console.log('theerdFactorial', answer, i)
        theerdFactorial = answer;
      }

      if(i === (n + 1)) {
        console.log('secondFactorial', answer, i)
        secondFactorial = answer;
      }
    }

    firstFactorial = answer;

    console.log(firstFactorial, secondFactorial, theerdFactorial)

    return Math.ceil(firstFactorial / (secondFactorial * theerdFactorial));
  }  
}
