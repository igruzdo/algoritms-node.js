// Определить сбалансированно ли дерево по критерию: Дерево считается сбалансированным, если левое и правое поддеревья 
// каждой вершины отличаются по высоте не больше, чем на единицу.
class CNode {  
    constructor(value) {  
        this.value = value;  
        this.left = null;  
        this.right = null;  
    }  
}

function solution(root) {
    // console.log(root)
    let isTreeBalanced = true;

    function getH(node, counter) {
        // console.log(node)
        let leftH = node.left ? getH(node.left, counter + 1) : counter;
        let rightH = node.right ? getH(node.right, counter + 1) : counter;
        if(Math.abs(leftH - rightH) > 1 && isTreeBalanced) {
            isTreeBalanced = false;  
        }
        // console.log('------------------------------------')
        // console.log(node)
        // console.log(leftH, rightH)
        // console.log('------------------------------------')
        return Math.max(leftH, rightH);
    }
    getH(root, 0);
    return isTreeBalanced;
}

// function test() {
//     var node0 = new CNode(0);
//     var node1 = new CNode(1);
//     var node2 = new CNode(2);
//     var node3 = new CNode(3);
//     var node4 = new CNode(4);
//     var node5 = new CNode(5);
//     var node6 = new CNode(6);
//     var node7 = new CNode(7);
//     var node8 = new CNode(8);
//     node0.left = node1;
//     node0.right = node2;
//     node1.left = node3;
//     node2.right = node4;
//     node3.left = node5;
//     node3.right = node6;
//     node4.left = node7;
//     node4.right = node8;

//     console.log(solution(node0));
// }

// test()