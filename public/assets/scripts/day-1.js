//regular expression to check if a string is a parse-able number, including negatives and decimal
const reg_num = /^-?\d+\.?\d*$|^\d*\.?\d+$/;
const modules = [];
let total = 0;

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
        const allLines = file.split(/\r\n|\n/);
        // Reading line by line
        allLines.forEach((line) => {
			console.log(reg_num.test(line));
			if(reg_num.test(line)){
				modules.push(line);
			}
		});
		if(modules.length > 0){
			modules.forEach(function(mod){
				total = total + fuelRequiredModule(mod);

			});
			document.getElementById("answer").innerHTML = total;
		}
    };

    reader.onerror = (event) => {
        alert(event.target.error.name);
    };
	reader.readAsText(file);
});

function fuelRequiredModule(modMass){
	let modFuel = 0;
	//calculate fuel needed for module
	let fuel = fuelRequired(modMass);
	//calculate fuel with additional fuel

	//if no additional fuel required, return fuel
	if (fuelRequired(fuel) <= 0){
		modFuel = fuel;
		return modFuel;
	}
	else{
		//additional fuel value will go down with each caluclation
		let additionalFuel = fuelRequired(fuel);
		modFuel = fuel;
		//module fuel is the total fuel for each module
		//while the additonal fuel is not 0
		while(additionalFuel > 0){
			modFuel =  modFuel + additionalFuel;
			//calculate teh additonal fuel for that fuel
			additionalFuel = fuelRequired(additionalFuel);
		}
		return modFuel;
	}
}

//for each module, divide by three, round down, and subtract 2.
function fuelRequired(mass){
	let fuel = Math.floor(mass/3);
	fuel = fuel - 2;
	return fuel;
}
