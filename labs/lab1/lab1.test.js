const lab1 = require("./lab1");

console.log(lab1.questionOne([5, 3])); 
// {'5':true, '3': true} 

console.log(lab1.questionOne([2,7])); 
// {'2': true,'7': true} 

console.log(lab1.questionOne([5, 10])); 
// {'5': true, '10': false}

console.log(lab1.questionOne([2, 7, 9, 1013,5,3])); 
// {'2': true, '3': true,'5':true, '7': true, '9': false, '1013': true}

console.log(lab1.questionOne([])); 
// {}

console.log(lab1.questionTwo([5, 3, 10,8,3,7,2])); 
//17576000

console.log(lab1.questionTwo([2,8,7,1])); 
//1643032

console.log(lab1.questionTwo([5, 10])); 
//1953125

console.log(lab1.questionTwo([2, 7, 9, 10,33])); 
// 2315685267

console.log(lab1.questionTwo([])); 
// 0



console.log(lab1.questionThree("The 33 quick brown fox jumps over 22nd of the lazy dog.")); 
/*
 { consonants: 27,
  vowels: 12,
  numbers: 4,
  spaces: 11,
  punctuation: 1,
  specialCharacters: 0}
  */

console.log(lab1.questionThree("How now brown cow in the 4th chow?!!!"));
/*{ consonants: 18,
  vowels: 7,
  numbers: 1,
  spaces: 7,
  punctuation: 4,
  specialCharacters: 0}
  */




console.log(lab1.questionThree("One day, 88 kids from the @# 22nd neighborhood carried my mother's groceries all the way home!! You know why? It was out of respect."));
/*{consonants: 61,
  vowels: 35,
  numbers: 4,
  spaces: 24,
  punctuation: 6,
  specialCharacters: 2}
  */


console.log(lab1.questionThree("CS 546 is going to be fun @PHill is a #good professor & I'm looking forward to working with you all this semester!!" )); 
/*
{ consonants: 53,
  vowels: 31,
  numbers: 3,
  spaces: 22,
  punctuation: 3,
  specialCharacters: 3 }
  */

console.log(lab1.questionThree("")); 
/*{ consonants: 0,
  vowels: 0,
  numbers: 0,
  spaces: 0,
  punctuation: 0,
  specialCharacters: 0 }
  */


console.log(lab1.questionFour(250000, 3.51, 10)); 

//Monthly Payment: 2473.32

console.log(lab1.questionFour(300000, 5, 16)); 
//2273.04

console.log(lab1.questionFour(19500, 7.60, 4)); 
//472.40

console.log(lab1.questionFour(100000, 2.78, 12)); 
//817.50

console.log(lab1.questionFour(330000, 4.5, 24)); 
//1875.80