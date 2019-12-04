const reg_num = new RegExp('^\\d+$');
let computer = [];
const comupterClone= [];
let startPos = 0;
let part2 = 0;
let o = 0;
let x = 1;
let y = 2;
let z = 3;

//Show puzzle or solution
function showPuzzle(){
	document.getElementById('puzzle').style.display = "block";
	document.getElementById('solution').style.display = "none";
}

function showSolution(){
	document.getElementById('puzzle').style.display = "none";
	document.getElementById('solution').style.display = "block";
}

//on input change, read items in file
document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
	if (this.files.length === 0) {
	  console.log('No file selected.');
	  return;
	}
	const file = this.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/[,]/);
        // Reading line by line
        allLines.forEach((line) => {
			if(reg_num.test(line)){
                computer.push(parseInt(line));
                comupterClone.push(parseInt(line));
			}
		});
		if(computer.length > 0){
			startPos = compute(12, 2);
            document.getElementById("answer").innerHTML = startPos;
            part2 = findPart2(19690720);
            document.getElementById("p2").innerHTML = part2;
		}
    };

    reader.onerror = (event) => {
        alert(event.target.error.name);
    };
	reader.readAsText(file);
});

function compute(noun, verb){ 
    computer[1] = noun;
    computer[2] = verb;
    while(computer[o] == 1 | computer[o] == 2){
        let opCode = computer[o];
        let pos1 = computer[x];
        let pos2 = computer[y];
        let pos3 = computer[z];
        //if op code is 1, opcodeone()
        if(opCode == 1){
            opCodeOne(pos1, pos2, pos3);
            stepForward();
        }
        //if op code is 2, opcodetwo()
        if(opCode == 2){
           opCodeTwo(pos1, pos2, pos3);
           stepForward();
        }
    }
    //if 99, stop and return value at position 0
    if(computer[o] == 99){
        return computer[0];
    }else{
        return "Error: Op code does not match codes";
    }
}

function opCodeOne(posOne, posTwo, posThree){
    // add together values at position 1 and position 2
    let i = computer[posOne] + computer[posTwo];
    //change value at position 3 to sum of above
    computer[posThree] = i;
}

function opCodeTwo(posOne, posTwo, posThree){
    //Mutiply values at position one and two
    let i = computer[posOne] * computer[posTwo];
    //change value at position three to result of above
    computer[posThree] = i;
}

function stepForward(){
    o = o + 4;
    x = x + 4;
    y = y + 4;
    z = z + 4; 
};
function findPart2(expected) {
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        computer = [...comupterClone];
        const result = compute(noun, verb);
        console.log(result);
        if (result === expected) {
            console.log(result + "=" + expected);
            return 100 * noun + verb;
        }
      }
    }
  }