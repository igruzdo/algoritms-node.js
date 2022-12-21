// Вставить новый узел в дерево


// class Node { 
//     constructor(value, left = null, right = null) { 
//         this.value = value; 
//         this.left = left; 
//         this.right = right; 
//     } 
// }

function insert(root, key) {
    const saveRoot = root;
    const insertNewNode = (node, key) => {
        if(key < node.value) {
            if(node.left) {
                insertNewNode(node.left, key)
            } else {
                node.left = {
                    value: key,
                    left: null,
                    right: null
                }
            }
        } else if(key >= node.value) {
            if(node.right) {
                insertNewNode(node.right, key)
            } else {
                node.right = {
                    value: key,
                    left: null,
                    right: null
                }
            }
        }
    }

    insertNewNode(root, key);
    return saveRoot;
}

// function test() {
//     let node1 = new Node(7, null, null);
//     let node2 = new Node(8, node1, null);
//     let node3 = new Node(7, null, node2);
//     let newHead = insert(node3, 7);
//     console.log(newHead === node3);
//     // console.log(newHead.left.value === 6);
// }

// test()