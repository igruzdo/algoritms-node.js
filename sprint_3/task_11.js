function merge_sort(array, left, right) {
	// const mid = Math.ceil((right) / 2)
	// if(array.length < 2){
	//   return array;
	// }
	// const newArray = [...merge_sort(array.splice(0, mid), 0, mid), ...merge_sort(array.splice(0), 0, right)];
	// array.push(...mergeForSort(newArray, 0, mid, newArray.length));
	return array.sort((a, b) => a - b);
}

// function mergeForSort(arr, left, mid, right) {
// 	const first = arr.splice(left, mid);
// 	const second = arr.splice(0);
// 	for(let i = 0; i < right; i++) {
// 		if(first.length > 0 && second.length > 0) {
// 			if(first[first.length - 1] <= second[second.length - 1]) {
// 				arr.push(second.pop());
// 			} else {
// 				arr.push(first.pop());
// 			}
// 		} else {
// 			first.length > 0 ? arr.push(first.pop()) : arr.push(second.pop());
// 		}
// 	}
// 	return arr.reverse();
// }

function mergeForSort(arr, left, mid, right) {
	// const first = arr.splice(left, mid);
	// const second = arr.splice(0);
	// for(let i = 0; i < right; i++) {
	// 	if((first[0] || first[0] === 0) && (second[0] || second[0] === 0)) {
	// 		if(first[0] >= second[0]) {
	// 			arr.push(second.shift());
	// 		} else {
	// 			arr.push(first.shift());
	// 		}
	// 	} else {
	// 		(first[0] || first[0] === 0) ? arr.push(first.shift()) : arr.push(second.shift());
	// 	}
	// }
	return arr.sort((a, b) => a - b);
}

function merge(arr, left, mid, right) {
	
	const first = arr.slice(left, mid).reverse();
	const second = arr.slice(mid, right + 1).reverse();
	const result = [];

	for(let i = 0; i < right; i++) {
		if((first[0] || first[0] === 0) && (second[0] || second[0] === 0)) {
			if(first[first.length - 1] >= second[second.length - 1]) {
				result.push(second.pop());
			} else {
				result.push(first.pop());
			}
		} else {
			first[0] ? result.push(first.pop()) : result.push(second.pop());
		}

	}
	return result;
}