const axios = require('axios');
const please = require('./people');

  async function getWork(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
    return data
  }

  async function listEmployees(){
    const Work = await getWork();
    const People = await please.getPeople();
    let ans = [];
    let obj = {};
    for (ele in Work){
        obj = {"company_name": Work[ele].company_name,
         "employees": []};
        for (e in Work[ele].employees){
            for (n in People){
                if (People[n].id === Work[ele].employees[e]){
                    obj["employees"].push({"first_name": People[n].first_name,
                     "last_name": People[n].last_name});
                }
            }
        }
        ans.push(obj);
    }
    return ans;
}

async function fourOneOne(phoneNumber){
  if(phoneNumber == undefined){
    throw "Error: Phone number does not exist"
}
if(typeof phoneNumber !== 'string' ){
    throw "Error: Phone number is not of type String"
}
  var re = /^\d{3}-?\d{3}-?\d{4}$/;
  var valid = re.test(phoneNumber);
  if(!valid){throw "Error: not in Format ###-###-#### "}
  const work = await getWork();
  for(let i = 0; i < work.length; i++){
    if(phoneNumber === work[i].company_phone){
      exists = true
      return work[i].company_name
  }
}

}

async function whereDoTheyWork(ssn){
  if(ssn == undefined){
    throw "Error: Ssn does not exist"
}
if(typeof ssn !== 'string' ){
    throw "Error: Ssn is not of type String"
}
  var re = /^\d{3}-?\d{2}-?\d{4}$/;
  var valid = re.test(ssn);
  if(!valid){throw "Error: not in Format ###-##-#### "}
  const people = await please.getPeople();
  const work = await getWork();
  var id;
  var exists = false;
  for(let i = 0; i < people.length; i++){
      if(people[i].ssn === ssn){
          id = people[i].id
          exists = true
  }
}
  if(exists ==  false){throw "Error: no one exists with that SSN."}

  
  for(let x = 0; x < work.length; x++){
      for(let i = 0; i < work[x].employees.length; i++){
          if(work[x].employees[i] === id){
              return work[x].company_name;
}}}}

module.exports = {listEmployees,whereDoTheyWork, fourOneOne}
