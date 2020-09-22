
// Mean Tests
const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils')
const objUtils = require('./objUtils')

try {
	console.log(arrayUtils.mean([]))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.mean([1,2,4,5]))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.medianSquared([2,4,10]))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.medianSquared())
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.maxElement(["hi"]))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.maxElement([1,2,3,4,5,6,22]))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.fill(-1))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.fill(3))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.countRepeating([]))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.countRepeating(([7, '7', 13, true, true, true, "Hello","Hello", "hello"])))
} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]))

} catch (error) {
	console.log(error)
}
try {
	console.log(arrayUtils.isEqual([1, 2, 3], [4, 5, 6]))

} catch (error) {
	console.log(error)
}
try {
	console.log(stringUtils.camelCase('i love coding'))

} catch (error) {
	console.log(error)
}

try {
	console.log(stringUtils.camelCase(123))

} catch (error) {
	console.log(error)
}

try {
	console.log(stringUtils.replaceChar(""))

} catch (error) {
	console.log(error)
}

try {
	console.log(stringUtils.replaceChar("babbbbbbbbbbbbbbbbble"))

} catch (error) {
	console.log(error)
}

try {
	console.log(stringUtils.mashUp())

} catch (error) {
	console.log(error)
}
try {
	console.log(stringUtils.mashUp("hello", "world"))

} catch (error) {
	console.log(error)
}
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
const fourth = {}
try {
	console.log(objUtils.makeArrays([first, second, third]))
} catch (error) {
	console.log(error)
}
try {
	console.log(objUtils.makeArrays([first, third, fourth]))
} catch (error) {
	console.log(error)
}

const uno = {a: 2, b: 3};
const dos = {a: 2, b: 4};
const tres = {};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

try {
	console.log(objUtils.isDeepEqual("hi", tres))
} catch (error) {
	console.log(error)
}
try {
	console.log(objUtils.isDeepEqual(forth, fifth))
} catch (error) {
	console.log(error)
}

try {
	console.log(objUtils.computeObject(uno, n => n + n))
} catch (error) {
	console.log(error)
}
try {
	console.log(objUtils.computeObject(dos))
} catch (error) {
	console.log(error)
}