let lowerRange = 0;
let upperRange = 1;
let total = 0;
const reg_num = new RegExp('[0-9]{6}');

//Show puzzle or solution
// eslint-disable-next-line no-unused-vars
function showPuzzle(){
	document.getElementById('puzzle').style.display = "block";
	document.getElementById('solution').style.display = "none";
}

// eslint-disable-next-line no-unused-vars
function showSolution(){
	document.getElementById('puzzle').style.display = "none";
	document.getElementById('solution').style.display = "block";
}

// eslint-disable-next-line no-unused-vars
function submitInput(){
    let x = document.getElementById("lowerRange").value;
    let y = document.getElementById("upperRange").value;
    validateRange(x, y);
}
function validateRange(lower, upper){
    //It is a six-digit number.
    if(reg_num.test(lower) && reg_num.test(upper)){
        if(lower < upper){
            lowerRange = lower;
            upperRange = upper;
            total = 0;
            document.getElementById('answer').innerHTML = findCriteriaMet();
        }
        else{
            document.getElementById('error').innerHTML = "Please make sure the upper range is higher than the lower range";
        }
    }
    else{
        document.getElementById('error').innerHTML = "Please make sure each range number is 6 didgets long eg. 123456";
    }
}

function findCriteriaMet(){
    //The value is within the range given in your puzzle input.
    for(let i = lowerRange; i < upperRange; i++){
        if(checkDigitIncrease(i)){
            if(checkOnlyTwoAdjacent(i)){
                total++;
            }
        }
    }
    return total;
}

//Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
function checkDigitIncrease(num){
    //split digit into array
    let numStr = num.toString();
    let digits = numStr.split("");
    //for each number, if the index before it is higher, return false
    for(let i = 1; i < digits.length; i++){
        if(digits[i] < digits[(i-1)]){
            return false;
        }
    }
    return true;
}

function checkOnlyTwoAdjacent(num) {
    let numStr = num.toString();
    let digits = numStr.split("");
    for(let i = 1; i < digits.length; i++){
        if(digits[i] == digits[(i-1)]){
            if(i == 1 && digits[2] != digits[i]){
                return true;
            }
            else if(digits[(i-2)] != digits[i] && digits[(i+1)] != digits[i]){
                return true;
            }
        }
        else if(digits[i] == digits[(i+1)]){
            if(i == 4 && digits[3] != digits[4]){
                return true;
            }
            else if(digits[(i+2)] != digits[i] && digits[(i-1)] != digits[i]){
                return true;
            }
        }
    }
    return false;
}
/*
no. of adjacents = 0;
for each didgit
    if(didgits[i-1] == digits[i])
*/