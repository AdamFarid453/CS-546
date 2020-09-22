function camelCase(str){
	if(typeof str !== 'string')
		throw("Error: Parameter is not a string.");
	if(str.length < 1)
		throw("Error: length must be greater than 0.");
	if(str == undefined)
		throw("Error: No parameter exists.");
	var str = str.toLowerCase();
	var split = str.split(" ");
	var result = split[0];
	for(let i = 1; i < split.length; i++){
		let temp = split[i].substring(0,1).toUpperCase() + split[i].substring(1);
		result = result + temp;
	}
	return result;
}

function replaceChar(string){
    if(string == undefined){
		throw 'Input does not exist'
	}
	if(typeof(string) !== 'string'){
		throw 'Input is not string'
	}
	if(string.length === 0){
		throw 'Input string cannot be empty'
	}
	
    let replace = string[0]
    var change =0
    for(i =1; i<string.length ;i++){
        if(replace.toLowerCase() == string[i].toLowerCase()){
            if(change==0){
                string = string.substring(0, i) + '*' + string.substring(i+1);
            }
            if(change==1){
                string = string.substring(0, i) + '$' + string.substring(i+1);
                change-=2
            }
            change+=1
        }
    }
    return string
}

const mashUp = function mashUp(string1, string2){
	if(string1 == undefined || string2 == undefined){
		throw("Error: one of the strings does not exist")
	}
	if(typeof(string1) !== 'string'){
		throw 'The first input is not of string type'
	}
	if(typeof(string2) !== 'string'){
		throw 'The second input is not of string type'
	}
	if(string1.length < 2 || string2.length < 2){
		throw("Error: one of the strings is not long enough")
	}
	var char1 = [];
	char1[0] = string1.substring(0,2);
	char1[1] = string1.substring(2);
	var char2 = [];
	char2[0] = string2.substring(0,2);
	char2[1] = string2.substring(2);
	var first = char1[0] + char2[1];
	var last = char2[0] + char1[1];
	var answer = last + " " + first;
	return answer;
}
module.exports = {camelCase,replaceChar,mashUp}