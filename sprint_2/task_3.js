/*
Вася размышляет, что ему можно не делать из того списка дел, который он составил. Но, кажется, все пункты очень важные! 
Вася решает загадать число и удалить дело, которое идёт под этим номером. Список дел представлен в виде односвязного списка. 
Напишите функцию solution, которая принимает на вход голову списка и номер удаляемого дела и возвращает голову обновлённого списка.
Внимание: в этой задаче не нужно считывать входные данные. Нужно написать только функцию, которая принимает на вход голову 
списка и номер удаляемого элемента и возвращает голову обновлённого списка.
*/



// class Node {  
//   constructor(value = null, next = null) {  
//     this.value = value;  
//     this.next = next;  
//   }  
// }


function solution(node, idx) {
    if(idx === 0) {
        let link = node.next;
        delete node.next;
        return link;
    }

    let next;
    let curr;

    for(let i = 0; i !== idx; i++) {
       
        if(node.next && i === 0) {
            curr = node;
            next = node.next;
        }

        if(node.next && i > 0) {
            curr = next;
            next = next.next;
        }

        if(i + 1 === idx) {
            curr.next = next.next;
            delete next.next;
            return node;
        }
    }
   
}

// function test() {
//     var node3 = new Node("node3");
//     var node2 = new Node("node2", node3);
//     var node1 = new Node("node1", node2);
//     var node0 = new Node("node0", node1);
//     var newHead = solution(node0, 0);
//     // result is node0 -> node2 -> node3
// }

// test()