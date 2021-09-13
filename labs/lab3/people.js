const axios = require('axios');


async function getPeople(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    return data
  }

async function getPersonById(id){
    const people = await getPeople()
    if(id == undefined){
        throw "Error: Id does not exist"
    }
    if(typeof id !== 'number' ){
        throw "Error: Id is not a Number"
    }
    if(id < 0 || id > 1000){
        throw "Error: Id not in bounds"
    }
    var result = people.filter(obj => {
        return obj.id === id
      })
      return result
}

async function howManyPerState(stateAbbrv){
    const people = await getPeople()
    if(stateAbbrv == undefined){
        throw "Error: State Abbreviation does not exist"
    }
    if(typeof stateAbbrv !== 'string' ){
        throw "Error: State Abbreviation is not of type String"
    }
    var counter = 0;
    for(i =0; i< people.length; i++){
        if(people[i].address.state === stateAbbrv){
            counter++;
        }
    }
    if(counter < 1){
        throw `Error there are no people that live in ${stateAbbrv}`
    }
    return counter
}

function getAge(date) {
    let today = new Date();
    let birthday = new Date(date);
    let year = today.getFullYear() - birthday.getFullYear();
    var month = today.getMonth() - birthday.getMonth();
    var date = today.getDate() < birthday.getDate();
    if (month < 0 || (month === 0 && date < 0)) {
        year--;
    }
    return year;
}

async function personByAge(index){
    const people = await getPeople()
    if(index == undefined){
        throw "Error: Index does not exist"
    }
    if(typeof index !== 'number' ){
        throw "Error: Index is not a Number"
    }
    if(index < 0 || index > 999){
        throw "Error: Id not in bounds"
    }
    people.sort(function(a,b) {
         return new Date(a.date_of_birth).getTime() - new Date(b.date_of_birth).getTime() 
        } );
    var result = people.map(function(obj) {
        return {
            first_name: obj.first_name,
            last_name: obj.last_name,
            date_of_birth: obj.date_of_birth,
            Age: getAge(obj.date_of_birth)
        };});
    return result[index]
}
async function peopleMetrics(){
    const people = await getPeople()
    averageAge = 0;
    mostRepeatingCity = "";
    obj={}
    for(x in people){
        if (obj[people[x].address.city] == undefined){
            obj[people[x].address.city] = 1;
        } else {
            obj[people[x].address.city] += 1;
        }
        let max = 0;
        for (const [key, value] of Object.entries(obj)){
            if (value > max){
                max = value;
                mostRepeatingCity = key;
            }
        }
        averageAge += getAge(people[x].date_of_birth);
    }
    var ans = 
    {
        "totalLetters": await totalLetters(people),
        "totalVowels": await totalVowels(people),
       	"totalConsonants": await totalConsonants(people),
       	"longestName": await longestName(people),
       	"shortestName": await shortestName(people),
       	"mostRepeatingCity": mostRepeatingCity,
       	"averageAge": averageAge
    }
    return ans
}


async function totalLetters(){
    const people = await getPeople();
    var letters = 0;
    for(let i = 0; i < people.length; i++){
        letters += people[i].first_name.length + people[i].last_name.length;
    }
   return letters
}

async function totalVowels(){
	const people = await getPeople();
	var vowels = 0;
	for(let i = 0; i < people.length; i++){
		vowels+= getVowels(people[i].first_name) + getVowels(people[i].last_name);
	}
	return vowels;
}

function getVowels(string){
	var vowels = string.match(/[aeiou]/gi);
	if(vowels == undefined)
		return 0;
	else
		return vowels.length;
}

async function totalConsonants(){
	const people = await getPeople();
	cons = 0;
	for(let i = 0; i < people.length; i++){
		cons += getCons(people[i].first_name) + getCons(people[i].last_name);
	}
	return cons;
}

function getCons(string){
	var cons = string.match(/[bcdfghjklmnpqrstvwxyz]/gi);
	if(cons == undefined)
		return 0
	else
		return cons.length;
}

async function longestName(){
	const people = await getPeople();
	var longestName = 0;
	var longestLength = 0;
	for(let i = 0; i < people.length; i++){
		if(people[i].first_name.length + people[i].last_name.length > longestLength){
			longestName = people[i].first_name + " " + people[i].last_name;
			longestLength = people[i].first_name.length + people[i].last_name.length;
		}
	}
	return longestName;
}

async function shortestName(){
	const people = await getPeople();
	var shortestName = people[0].first_name + " " + people[0].last_name;
	var shortestLength = people[0].first_name.length + people[0].last_name.length;
	for(let i = 0; i < people.length; i++){
		if(people[i].first_name.length + people[i].last_name.length < shortestLength){
			shortestName = people[i].first_name + " " + people[i].last_name;
			shortestLength = people[i].first_name.length + people[i].last_name.length; 
		}
	}
	return shortestName;
}

module.exports= {getPeople,getPersonById, personByAge, peopleMetrics, howManyPerState}