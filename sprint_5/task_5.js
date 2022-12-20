/**
 * Гоша понял, что такое дерево поиска, и захотел написать функцию, которая определяет, 
 * является ли заданное дерево деревом поиска. Значения в левом поддереве должны быть строго меньше, 
 * в правом —- строго больше значения в узле.
Помогите Гоше с реализацией этого алгоритма.
 */





class CNode {  
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}


function solution(root) {
    let balance = true;
    
    const checkTreeLeft = (node) => {
        if(!balance) {
            return;
        }
        if(node.left && node.right) {
            balance = node.left.value < node.value && node.right.value > node.value && node.left.value < root.value && node.right.value < root.value;
            // console.log('balance checkTreeLeft', balance)
            // console.log('node.left.value', node.left.value)
            // console.log('node.right.value', node.right.value)
            // console.log('node.value', node.value)
            // console.log('root.value', root.value)
            if(balance) {
                checkTreeLeft(node.left);
                checkTreeLeft(node.right);
            } else {
                return
            }
        } else {
            if(node.left) {
                balance = node.left.value < node.value && node.left.value < root.value;
                // console.log('balance checkTreeLeft node.left', balance)
                if(balance) {
                    checkTreeLeft(node.left);
                }
            } else if(node.right) {
                balance = node.right.value > node.value && node.right.value < root.value;
                // console.log('balance checkTreeLeft node.right', balance)
                if(balance) {
                    checkTreeLeft(node.right);
                }
            }
        }
    }

    const checkTreeRight = (node) => {
        if(!balance) {
            return;
        }
        if(node.left && node.right) {
            balance = node.left.value < node.value && node.right.value > node.value && node.left.value > root.value && node.right.value > root.value;
            // console.log('balance checkTreeRight', balance)
            if(balance) {
                checkTreeRight(node.left);
                checkTreeRight(node.right);
            }
        } else {
            if(node.left) {
                balance = node.left.value < node.value && node.left.value > root.value;
                // console.log('balance checkTreeRight node.left', balance)
                if(balance) {
                    checkTreeRight(node.left);
                }
            } else if(node.right) {
                balance = node.right.value > node.value && node.right.value > root.value;
                // console.log('balance checkTreeRight node.right', balance)
                if(balance) {
                    checkTreeRight(node.right);
                }
            }
        }
    }

    const checkTree = (node) => {
        // console.log('checkTree', node.left.value < node.value && node.right.value > node.value)
        if(node.left.value < node.value && node.right.value > node.value) {
            checkTreeLeft(node.left);
            checkTreeRight(node.right);
        } else {
            balance = false;
        }

    }

    checkTree(root)

    return balance;
}

// function test() {
//     var node1 = new CNode(1, null, null);
//     var node2 = new CNode(4, null, null);
//     var node3 = new CNode(3, node1, node2);
//     var node4 = new CNode(8, null, null);
//     var node5 = new CNode(5, node3, node4);
//     console.log(node5)
//     console.log(solution(node5));
//     node4.value = 5;
//     console.log(node5)
//     console.log(solution(node5));
// }

// test()