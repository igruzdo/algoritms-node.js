//Вывести в возрастающем порядке все узлы дерева

// class Node { 
//     constructor(value, left = null, right = null) { 
//         this.value = value; 
//         this.left = left; 
//         this.right = right; 
//     } 
// }


function printRange(root, left, right) {


    const checkRange = (v, l, r) => {
        return v >= l && v <=r;
    }

    const objDic = {}

    const getValues = (node) => {
        if(checkRange(node.value, left, right)) {
            if(objDic[node.value]) {
                objDic[node.value] = objDic[node.value] + 1
            } else {
                objDic[node.value] = 1;
            }

            if(node.left) {
                getValues(node.left)
            }
    
            if(node.right) {
                getValues(node.right)
            }
        } else {
            if(node.value < left) {
                if(node.right) {
                    getValues(node.right)
                }
            }

            if(node.value > right) {
                if(node.left) {
                    getValues(node.left)
                } 
            }
        }


    }

    getValues(root)
    for(let key in objDic) {
        for(let i = 0; i < objDic[key]; i++) {
            process.stdout.write(`${key}` + '\n');
        }
    }
}

// function test() {
//     var node1 = new Node(2, null, null);
//     var node2 = new Node(1, null, node1);
//     var node3 = new Node(8, null, null);
//     var node4 = new Node(8, null, node3);
//     var node5 = new Node(9, node4, null);
//     var node6 = new Node(10, node5, null);
//     var node7 = new Node(5, node2, node6);
//     printRange(node7, 2, 8);
//     // expected output: 2 5 8 8
// }

// test()