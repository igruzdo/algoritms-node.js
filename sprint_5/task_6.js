//максимальная глубина дерева


function solution(root) {
    let max = 0;

    function setMax(tree, m) {
        if(tree && tree.value) {
            let newM = m + 1;
            max = max > newM ? max : newM;
            setMax(tree.left, newM)
            setMax(tree.right, newM)
        } else {
            return;
        }
    }

    setMax(root, 0)

    return max;
}




// class CNode {  
//     constructor(value, left = null, right = null) {
//         this.value = value;
//         this.left = left;
//         this.right = right;
//     }
// }


// function test() {
//     var node1 = new CNode(1, null, null);
//     var node2 = new CNode(4, null, null);
//     var node3 = new CNode(3, node1, node2);
//     var node4 = new CNode(8, null, null);
//     var node5 = new CNode(5, node3, node4);
//     console.assert(solution(node5) === 3);
// }

// test()