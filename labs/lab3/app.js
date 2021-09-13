const axios = require('axios');

const people = require('./people');
const work = require ('./work');


async function main(){
    try{
        const peopledata = await work.whereDoTheyWork("299-63-8866");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

//call main
main();