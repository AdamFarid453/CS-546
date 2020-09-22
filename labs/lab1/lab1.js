

const questionOne = function questionOne(arr) {


    var yeah = {}
    if(!arr || arr.length === 0){
        return yeah;
    } 
    for(i=0;i<arr.length; i++){
        yeah[arr[i]] = isPrime(arr[i])
    }
    return yeah;
}
function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

const questionTwo = function questionTwo(num) { 
    sum=0;
    for(i = 0; i < num.length; i++)
    {
        sum += num[i]**2
    }
    answer = Math.pow(sum,6);

    return Math.sqrt(answer);

}

const questionThree = function questionThree(text) {

    var answer = {
        "consonants" : countConsonants(text), 
        "vowels"     : countVowels(text),
        "numbers"    : countDigits(text),
        "spaces"     : text.split(" ").length -1,
        "punctuation": findPunct(text),
        "specialCharacters" : findSpec(text)
    };
    if (text == ""){
        for(i = 0; i< answer.length; i++){
            answer[i] = 0
        };
    }
    return answer;


}

function countDigits(text){
    var ans = text.match(/\d+/g);
    var total = 0;
    if(ans == null){
        return 0;
        
    }
    for(var x = 0; x < ans.length; x++)
    {
        total = total + ans[x].length;
    }
    return total;
}

function countConsonants(text){
    let consonants = ['b','c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

    let uppercased = ['B','C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

    counter = 0;
    for(i=0;i<text.length; i++){
        if(consonants.includes(text[i]) || uppercased.includes(text[i])){
            counter++;
        }
    }
    return counter;
}

function countVowels(text){
    let vowels = ['a','e','i','o','u'];

    let uppercased = ['A', 'E', 'I', 'O', "U"];

    counter = 0;
    for(i=0;i<text.length; i++){
        if(vowels.includes(text[i]) || uppercased.includes(text[i])){
            counter++;
        }
    }
    return counter;
}



function findPunct(text){
    let punc = ['.','?', "'", '"', ",", "-", "–", "—", "!", ":", ";", "(", ")", "[", "]" , "/"];

    
    counter = 0;
    for(i=0;i<text.length; i++){
        if(punc.includes(text[i])){
            counter++;
        }
    }
    return counter;
}


function findSpec(text){
    let spec = ['@','#', '~', '`', '$', '%','^','&','*',"+",'=','{','}','|', "_", "<", ">", "\\"]
    counter = 0;
    for(i=0;i<text.length; i++){
        if(spec.includes(text[i])){
            counter++;
        }
    }
    return counter;

}




const questionFour = function questionFour(loanAmount,interest,years) {
    var month = years*12;
    interest = interest/100;
    var i = interest/12; 
    
    let numerator = loanAmount*i*(Math.pow(1+i,month));
    let denominator = Math.pow(1+i,month) -1;
    var ans = numerator/denominator;
    return parseFloat(ans).toFixed(2);
} 

module.exports = {
    firstName: "Adam", 
    lastName: "Farid", 
    studentId: "10439232",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};