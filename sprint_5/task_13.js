//реализовать просеивание вверх

function siftUp(heap, index) {
    let findIdx = index;

    function findIndex(heap, index) {
        if(index === 1) {
            // findIdx = index;
            return;
        }
    
        let parentIdx = Math.floor(index / 2);
    
        if(heap[parentIdx] < heap[index]) {
            [heap[index], heap[parentIdx]] = [heap[parentIdx], heap[index]];
            findIdx = parentIdx;
            findIndex(heap, parentIdx)
        } 
    }

    findIndex(heap, index)   
    return findIdx;

}

// function test() {
//     var sample = [-1, 12, 6, 8, 3, 15, 7];
//     console.log(siftUp(sample, 5) == 1);
//     sample[3] = 14
//     console.log(siftUp(sample, 3) == 3);
// }

// test()

// function siftDown(heap, idx) {
//     let findIdx;


//     function setLargestIdx(heap, idx) {
//         let left = 2 * idx;
//         let right = 2 * idx + 1;
//         let index_largest;

//         if(heap.length < left) {
//             findIdx = idx;
//             return;
//         }
    
//         if(right <= heap.length && heap[left] < heap[right]) {
//             index_largest = right;
//         } else {
//             index_largest = left
//         }
    
//         if(heap[idx] < heap[index_largest]) {
//             [heap[idx], heap[index_largest]] = [heap[index_largest], heap[idx]];
//             findIdx = index_largest;
//             setLargestIdx(heap, index_largest);
//         } else {
//             findIdx = idx; 
//         }
//     }

//     setLargestIdx(heap, idx)

//     return findIdx;

// }
