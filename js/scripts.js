//Run once on page load to setup timer boxes and button/////////////////////
TimerInputs = document.getElementById("TimerInputs");
var tempstring;
tempstring = "<h1>TIMER</h1><select id = 'hours'><option selected>HOURS</option>";

for (var i=0; i < 24; i++) {
	tempstring += "<option>" + i + " hr</option>";
}
tempstring += "</select>";
tempstring += "<select id = 'minutes'><option selected>MINUTES</option>";
for (var i=0; i < 60; i++) {
	tempstring += "<option>" + i + " min</option>";
}
tempstring += "</select>";
tempstring += "<select id = 'seconds'><option selected>SECONDS</option>";
for (var i=0; i < 60; i++) {
	tempstring += "<option>" + i + " sec</option>";
}
tempstring += "</select><button id = 'TimerStart'>START</button><button id = 'TimerPause'>PAUSE</button>";
TimerInputs.innerHTML = tempstring;
////////////////////////////////////////////////////////////////////////////

//Timer Variables
var TimerStartButton = document.getElementById("TimerStart");
var TimerPauseButton = document.getElementById("TimerPause");
var TimerOutput;
var TimerHours;
var TimerMinutes;
var TimerSeconds;
var TimerMS;
var TargetTime;
var refresherStorage;
var timetoFinish;
var paused = true;
var pausedTime;

//When the timer start button is clicked
TimerStartButton.onclick = function() {
	paused = false;
	TimerPauseButton.innerHTML = "PAUSE";
	clearInterval(refresherStorage);
	//Get input values
	TimerHours = document.getElementById("hours").value.split(' ');
	TimerMinutes = document.getElementById("minutes").value;
	TimerSeconds = document.getElementById("seconds").value;
	TimerOutput = document.getElementById("TimerOutput");

	//convert input values
	if (TimerHours == "HOURS") { TimerHours = 0;} else {TimerHours = TimerHours[0];}
	if (TimerMinutes == "MINUTES") { TimerMinutes = 0;} else {TimerMinutes = TimerMinutes[0];}
	if (TimerSeconds == "SECONDS") { TimerSeconds = 0;} else {TimerSeconds = TimerSeconds[0];}
	TargetTime = now() + TimerHours * 60 * 60 * 1000 + TimerMinutes * 60 * 1000 + TimerSeconds * 1000;
	//run timer function
	refreshIt();
}

//when the timer pause button is clicked
TimerPauseButton.onclick = function() {
	//if the timer has been initiated
	if (TimerOutput != null){  
		if (TimerOutput.innerHTML != "DONE!" && TargetTime != null) {
	if (paused == false) {
	clearInterval(refresherStorage);
	TargetTime = timetoFinish;
	this.innerHTML = "RESUME";
	paused = true; }
	else {
		this.innerHTML = "PAUSE";
		TargetTime += now();
		paused = false;
		refreshIt();
	} } }
}

//get the current time (since 1970)
function now() {
  return ((new Date()).getTime());
}

//timer output
function refreshIt() {
	refresh();
	//rereun the timer output refresh every millisecond
	refresherStorage = setInterval(refresh, 1);
}

//function to refresh the timer output
function refresh() {
    // Find the distance between now and the target time
	timetoFinish = TargetTime - now();

    // Time calculations for days, hours, minutes and seconds
    TimerHours = Math.floor((timetoFinish % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    TimerMinutes = Math.floor((timetoFinish % (1000 * 60 * 60)) / (1000 * 60));
    TimerSeconds = Math.floor((timetoFinish % (1000 * 60)) / 1000);
    TimerMS = timetoFinish % 1000;
    //format the output
	formatTimerOutput();
	//if timer is at 0, clear it and output done
	if (timetoFinish <= 0) {
	clearInterval(refresherStorage);
	TimerOutput.innerHTML = "DONE!";
	TimerPauseButton.innerHTML = "PAUSE";
	paused = false;
  	}
  	
}
//format the output string
function formatTimerOutput() {
	tempstring = "";
		
		if (TimerHours > 0) {
			tempstring += TimerHours + ":";
		}

		if (TimerMinutes >= 0 && TimerMinutes < 10) {
			tempstring += "0" + TimerMinutes + ":";
		}
		else {
			tempstring += TimerMinutes + ":";
		}
		

		if (TimerSeconds >= 0 && TimerSeconds < 10) {
			tempstring += "0" + TimerSeconds;
		}
		else {
			tempstring += TimerSeconds;
		}

		tempstring += "<span id='red'>" + TimerMS + "</span>";

		TimerOutput.innerHTML = tempstring;
}

/////////////////////////////////////////////////////////////////
//End of timer implementation
/////////////////////////////////////////////////////////////////
//Stopwatch Implementation. Some functions from above are used.
///////////////////////////

//stopwatch variables
SWOutput = document.getElementById("StopwatchOutput");
SWStartButton = document.getElementById("SWStart");
SWPauseButton = document.getElementById("SWPause");
var refresherStorageSW
var SWStartTime;
var timePassed;
var SWpaused = true;

//on clicking the start stopwatch button
SWStartButton.onclick = function() {
		SWpaused = false;
		SWPauseButton.innerHTML = "PAUSE";
		clearInterval(refresherStorageSW);
		SWStartTime = now();
		StartSW();
}

//start the stopwatch
function StartSW() {
	SWRefresh();
	//rerun function/refresh the output every 1 millisecond
	refresherStorageSW = setInterval(SWRefresh, 1);
}

//refresh output function
function SWRefresh() {
	//get the current time that shuold be displayed
	timePassed = now() - SWStartTime;
	
	//split the time into hours/min/etc
	SWHours = Math.floor((timePassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    SWMinutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
    SWSeconds = Math.floor((timePassed % (1000 * 60)) / 1000);
    SWMS = timePassed % 1000;
    //format the output
    formatSWOutput();

}

//format the Stopwatch output
function formatSWOutput() {
	tempstring = "";
		
		
		if (SWHours >= 0 && SWHours < 10) {
			tempstring += "0" + SWHours + ":";
		}
		else {
			tempstring += SWHours + ":";
		}


		if (SWMinutes >= 0 && SWMinutes < 10) {
			tempstring += "0" + SWMinutes + ":";
		}
		else {
			tempstring += SWMinutes + ":";
		}
		

		if (SWSeconds >= 0 && SWSeconds < 10) {
			tempstring += "0" + SWSeconds + "";
		}
		else {
			tempstring += SWSeconds + "";
		}

		tempstring += "<span id='red'>" + SWMS + "</span>";

		SWOutput.innerHTML = tempstring;
}

//stopwatch pause button
SWPauseButton.onclick = function() {
	if (timePassed != null){
	if (SWpaused == false) {
	clearInterval(refresherStorageSW);
	this.innerHTML = "RESUME";
	SWpaused = true; }
	else {
		this.innerHTML = "PAUSE";
		SWStartTime	= now() - timePassed;
		SWpaused = false;
		StartSW();
		
	}  }
}