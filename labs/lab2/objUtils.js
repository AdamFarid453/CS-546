const arrayUtils = require('./arrayUtils');

const makeArrays = function makeArrays(arr){
    if(typeof arr != typeof[{}]){throw("Error: parameter provided isn't an array of objects.")} 
	if(arr.length < 2){throw("Error: array is too short, must be at least 2 elements.")}
	let answer = []
	for(let x of arr){ 
		if(x === null || typeof x !== 'object' ){throw 'Error: Must be non-null'}
		if(Object.keys(x).length === 0 || !x){throw 'Error: an element is empty'}}
	for(let x of arr){
		answer = answer.concat(Object.entries(x))
	}
	return answer
}


function computeObject(object, func){
	if(object == undefined || func == undefined){
		throw 'Error: Input does not exist'
	}

	if(!(object instanceof Object)){
		throw 'Error: Input object type wrong'
	}
	if(!(func instanceof Function)){
		throw 'Error: Input function type wrong'
	}
	if(Object.keys(object).length === 0){
		return object
	}
	for(let ele in object){
		if(object[ele] instanceof Object){
			computeObject(object[ele],func)
		}else{
			object[ele] = func(object[ele])
		}
	}
	return object
}
function isDeepEqual(obj1, obj2){
	if (typeof obj1 === 'undefined' || typeof obj2 === 'undefined') {
		throw 'Error: one or more of the parameters are missing."'
	}

	if (typeof obj1 != typeof obj2 || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
		throw 'Error: one or more of the parameters are not an object'
	}
	if(!arrayUtils.isEqual(Object.keys(obj1), Object.keys(obj2))){
		return false;
	}
	let answer = true;
	Object.keys(obj1).forEach(x => {
		if(typeof obj1[x] === 'object') {
			if(!isDeepEqual(obj1[x], obj2[x])) {
				answer = false;
			}
		}
		else {
			if(obj1[x] !== obj2[x]) {
				answer = false;
			}
		}
	});
	return answer;
}


module.exports = 
{makeArrays,isDeepEqual,computeObject}