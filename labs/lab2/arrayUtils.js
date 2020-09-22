
function mean(arr){
	if (arr == undefined) {
		throw "Error: No input provided";
	}
	if (!Array.isArray(arr)) {
		throw "Valid array needed to get unique elements"
	}
	if (arr.length === 0) {
		throw "Error: the provided array is empty"
	}
    sum=0
    for(i=0; i <arr.length; i++){
        if (typeof (arr[i]) !== 'number') {
			throw `Error: The element at Index ${i} is not a number. `
		}
        sum+=arr[i]
    }
    return sum/arr.length;
}

function medianSquared(arr){
    if (arr == undefined) {
		throw `Error: No input provided`;
	}
	if (typeof(arr) != typeof []) {
		throw `Error: Input is not of array type`;
	}
	if (arr.length === 0) {
		throw `Error: the provided array is empty`
    }
    for(i=0; i <arr.length; i++){
        if (typeof (arr[i]) !== 'number') {
			throw `Error: The element at Index ${i} is not a number. `
		}
    }
	arr.sort(function(a,b){
	  return a-b;
	});
  
	var half = Math.floor(arr.length / 2);
  
	if (arr.length % 2)
	  return arr[half]**2;
  
	var answer = (arr[half - 1] + arr[half]) / 2.0;
	return answer **2

}

function maxElement(arr){
    if (arr == undefined) {
		throw "Error: No input provided";
	}
	if (!Array.isArray(arr)) {
		throw "Valid array needed to get unique elements"
	}
	if (arr.length === 0) {
		throw "Error: the provided array is empty"
    }
    for(i=0; i <arr.length; i++){
        if (typeof (arr[i]) !== 'number') {
			throw `Error: The element at Index ${i} is not a number. `
        }
    }
    var ans = {}
    var yeah = Math.max(...arr)
    var probably = arr.indexOf(yeah)
    ans[yeah]=probably;
    return ans
}

function fill(end, value){
    if (end == undefined) {
		throw 'Error: end number does not exist'
	}
	if (typeof (end) !== 'number') {
		throw 'Error: end must be number'
	}
	if (end <= 0) {
		throw 'Error: end number must be positive'
	}
	if (!Number.isInteger(end)) {
		throw 'Error: end number must be integer'
	}
    var ans = [];
    if(value == undefined){
        for (var i = 0; i <= end-1; i++) {
            ans.push(i);
         }
         return ans
    }
    for (var i = 0; i <= end-1; i++) {
        ans.push(value);
     }
     return ans
}

const countRepeating = function countRepeating(array){
	if(array == undefined)
		throw("Error: no parameter given");
	if(!Array.isArray(array))
		throw("Error: no array given");
	for(let x = 0; x < array.length; x++){
		array[x] = array[x].toString();
	}
	array.sort();
	var repeated = {};
	for(let x = 0; x < array.length; x++){
		let count = 0;
		for(let y = 0; y < array.length; y++){
			if(array[x] === array[y])
				count++;
		}
		if(count > 1)
			repeated[array[x]] = count;
	}
	return repeated;
}
function isEqual(arrOne, arrTwo){
    if(!Array.isArray(arrOne)) {
        throw "Error: First argument is not an array";
    }
    if(!Array.isArray(arrTwo)) {
        throw "Error: Second argument is not an array";
    }

    if(arrOne.length !== arrTwo.length) {
        return false;
    }
    arrOne.sort()
    arrTwo.sort()

	for (let i = 0; i < arrOne.length; i++) {
		if (Array.isArray(arrOne[i]) && Array.isArray(arrTwo[i])) {
			if (!isEqual(arrOne[i], arrTwo[i])) {
				return false
			}
		} else {
			if (arrOne[i] !== arrTwo[i]) {
				return false
			}
		}
	}
	return true
}

console.log(medianSquared([2,9,3,8,10,11]))
module.exports = { mean, medianSquared, maxElement, fill, countRepeating, isEqual }
