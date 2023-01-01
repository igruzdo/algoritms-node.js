//проверка двух деревьев на анаграмность

function getLeftStr(tree, prefix) {
    let newPrefix = prefix + `${tree.value}`;
    if(tree.left && tree.right) {
        return `${tree.value}-${getLeftStr(tree.right, newPrefix)}-${getLeftStr(tree.left, newPrefix)}-`
    } else if(tree.left && !tree.right) {
        return `${tree.value}-null-${getLeftStr(tree.left, newPrefix)}-`
    } else if(!tree.left && tree.right) {
        return `${tree.value}-${getLeftStr(tree.right, newPrefix)}-null-`
    } else {
        return `${tree.value}-null-null-`
    }
}

function getRightStr(tree, prefix) {
    let newPrefix = prefix + `${tree.value}`;
    if(tree.left && tree.right) {
        return `${tree.value}-${getRightStr(tree.left, newPrefix)}-${getRightStr(tree.right, newPrefix)}-`
    } else if(tree.left && !tree.right) {
        return `${tree.value}-${getRightStr(tree.left, newPrefix)}-null-`
    } else if(!tree.left && tree.right) {
        return `${tree.value}-null-${getRightStr(tree.right, newPrefix)}-`
    } else {
        return `${tree.value}-null-null-`
    }
}




function solution(root) {
    if(root.left && root.right) {
        const leftTreeStr = getLeftStr(root.left, '');
        const rightTreeStr = getRightStr(root.right, '');
        return leftTreeStr === rightTreeStr;
    } else if(!root.left && !root.right) {
        return true;
    } else {
        return false;
    }
}
// class CNode {  
//     constructor(value, left = null, right = null) {
//         this.value = value;
//         this.left = left;
//         this.right = right;
//     }
// }
// function test() {
//     var node5 = new CNode(0,  null,  null);
//     var node6 = new CNode(1,  null,  null);
//     var node7 = new CNode(1,  null,  null);
//     var node8 = new CNode(0,  null,  null);
//     var node3 = new CNode(3, node5, node6);
//     var node4 = new CNode(3, node7, node8);
//     var node2 = new CNode(2, null, node4);
//     var node1 = new CNode(2, node3, null);
//     var node0 = new CNode(0, node1, node2);
//     console.assert(solution(node0));
// }

// test()