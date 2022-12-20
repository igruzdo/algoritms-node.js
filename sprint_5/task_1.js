/**
 * Гоша повесил на стену гирлянду в виде бинарного дерева, в узлах которого находятся лампочки. У каждой лампочки есть своя яркость. 
 * Уровень яркости лампочки соответствует числу, расположенному в узле дерева. Помогите Гоше найти самую яркую лампочку в гирлянде, 
 * то есть такую, у которой яркость наибольшая.
 */




// class CNode {  
//     constructor(value) {  
//         this.value = value;  
//         this.left = null;  
//         this.right = null;  
//     }  
// }


function solution(root) {
    let max = 0;
    
    const setMaxFromNode = (node) => {
        max = node.value > max ? node.value : max;
        if(node.left) {
            setMaxFromNode(node.left)
        }
        if(node.right) {
            setMaxFromNode(node.right)
        }
    }

    setMaxFromNode(root)

    return max;
}



// function test() {
//     let node1 = new CNode(1);
//     let node2 = new CNode(-5);
//     let node3 = new CNode(3);
//     node3.left = node1;
//     node3.right = node2;
//     let node4 = new CNode(2);
//     node4.left = node3;
//     console.log(solution(node4) === 3);
// }


// test()