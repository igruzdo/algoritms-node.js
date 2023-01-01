//проверка двух деревьев на 100% сходство

function getStr(tree, prefix) {
    let newPrefix = prefix + `${tree.value}`;
    if(tree.left && tree.right) {
        return `${tree.value}-${getStr(tree.right, newPrefix)}-${getStr(tree.left, newPrefix)}-`
    } else if(tree.left && !tree.right) {
        return `${tree.value}-null-${getStr(tree.left, newPrefix)}-`
    } else if(!tree.left && tree.right) {
        return `${tree.value}-${getStr(tree.right, newPrefix)}-null-`
    } else {
        return `${tree.value}-null-null-`
    }
}

function solution(root1, root2) {
    const root1Str = getStr(root1, '');
    const root2Str = getStr(root2, '');
    return root1Str === root2Str;
}

class CNode {  
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}


// function test() {
//     var node1 = new CNode(1,  null,  null);
//     var node2 = new CNode(2,  null,  null);
//     var node3 = new CNode(3,  node1,  node2);

//     var node4 = new CNode(1,  null,  null);
//     var node5 = new CNode(2,  null,  null);
//     var node6 = new CNode(3,  node4,  node5);
    
//     console.assert(solution(node3, node6));
// }

// test()