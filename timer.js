var canType = false;
var cursorPos = 0;
var inputDays = 0;
var inputHours = 0;
var inputMinutes = 0;
var inputSeconds = 0;

$(document).ready(function() {
    
	//click events for ajax pages
    $('body').click(function(event){
		
		//turn cursor blink and keyboard input on/off
    	if($(event.target).hasClass("timer")){
    		
    		deleteOldTimers();
    		
    		switch(true){
				case $(event.target).hasClass("days"):
					$("#hours-cursor").removeClass("cursor");
					$("#minutes-cursor").removeClass("cursor");
					$("#seconds-cursor").removeClass("cursor");
					$("#days-cursor").addClass("cursor");
					cursorPos = 2;
					break;
				case $(event.target).hasClass("hours"):
					$("#days-cursor").removeClass("cursor");
					$("#minutes-cursor").removeClass("cursor");
					$("#seconds-cursor").removeClass("cursor");
					$("#hours-cursor").addClass("cursor");
					cursorPos = 5;
					break;
				case $(event.target).hasClass("minutes"):
					$("#hours-cursor").removeClass("cursor");
					$("#days-cursor").removeClass("cursor");
					$("#seconds-cursor").removeClass("cursor");
					$("#minutes-cursor").addClass("cursor");
					cursorPos = 8;
					break;
				case $(event.target).hasClass("seconds"):
					$("#hours-cursor").removeClass("cursor");
					$("#minutes-cursor").removeClass("cursor");
					$("#days-cursor").removeClass("cursor");
					$("#seconds-cursor").addClass("cursor");
					cursorPos = 11;
					break;
    		}
    		
			canType = true;
			
    	}else if($(".right .question:nth-child(4)").hasClass('active')){
    			
    			createTimers();
    			
    			$("#hours-cursor").removeClass("cursor");
    			$("#minutes-cursor").removeClass("cursor");
    			$("#days-cursor").removeClass("cursor");
    			$("#seconds-cursor").removeClass("cursor");
				canType = false;
				
				switch(event.target.id){
					case('countDownStart'):
						countDownStartClicked(event.target);
						break;
					 case('countDownReset'):
					 	countDownResetClicked();
					 	break;
					 case('countUpStart'):
						countUpStartClicked(event.target);
						break;
					case('countUpReset'):
						countUpResetClicked();
						break;
				}
    	}
    	
    });

	//StopWatch buttons
	function countDownStartClicked(theTarget){
	
		var buttonText = "Start";
	
		if($(theTarget).text() == 'Start'){
		
			if(typeof countDownStopWatch != 'undefined'){
				buttonText = countDownStopWatch.start();
			}
		
			$(theTarget).text(buttonText);
				
		}else if($(theTarget).text() == 'Pause'){
		
			if(typeof countDownStopWatch != 'undefined'){
				buttonText = countDownStopWatch.pause();
			}
		
			$(theTarget).text(buttonText);
	
		}
	}

	function countDownResetClicked(){
		var buttonText = countDownStopWatch.reset();
		$('#countDownStart').text(buttonText);
		updateTimerDisplay(countDownStopWatch.display);
	}

	function countUpStartClicked(theTarget){

	var buttonText = "Start";

	if($(theTarget).text() == 'Start'){
		
		buttonText = countUpStopWatch.start();
		$(theTarget).text(buttonText);
		
	}else if($(theTarget).text() == 'Pause'){

		buttonText = countUpStopWatch.pause();
		$(theTarget).text(buttonText);

	}
}

	function countUpResetClicked(){
		var buttonText = countUpStopWatch.reset();
		$('#countUpStart').text(buttonText);
		updateTimerDisplay(countUpStopWatch.display);
	}

	//input on key press functionality
	$('body').keypress(function(event){
		
		if((canType === true)){
			
			if((event.which >= 49)&&(event.which <=58)||(event.which == 48)){
				
				switch(cursorPos){
					case 2:
						$(".timer-input .time-digit:nth-child(1)").text($(".timer-input .time-digit:nth-child(2)").text());
						$(".timer-input .time-digit:nth-child(2)").text(String.fromCharCode(event.which));
						break;
					case 5:
						$(".timer-input .time-digit:nth-child(4)").text($(".timer-input .time-digit:nth-child(5)").text());
						$(".timer-input .time-digit:nth-child(5)").text(String.fromCharCode(event.which));
						break;
					case 8:
						$(".timer-input .time-digit:nth-child(7)").text($(".timer-input .time-digit:nth-child(8)").text());
						$(".timer-input .time-digit:nth-child(8)").text(String.fromCharCode(event.which));
						break;
					case 11:
						$(".timer-input .time-digit:nth-child(10)").text($(".timer-input .time-digit:nth-child(11)").text());
						$(".timer-input .time-digit:nth-child(11)").text(String.fromCharCode(event.which));
						break;
				}
				
			}else if(event.which == 8){
			
				switch(cursorPos){
					case 2:
						$(".timer-input .time-digit:nth-child(2)").text($(".timer-input .time-digit:nth-child(1)").text());
						$(".timer-input .time-digit:nth-child(1)").text(0);
						break;
					case 5:
						$(".timer-input .time-digit:nth-child(5)").text($(".timer-input .time-digit:nth-child(4)").text());
						$(".timer-input .time-digit:nth-child(4)").text(0);
						break;
					case 8:
						$(".timer-input .time-digit:nth-child(8)").text($(".timer-input .time-digit:nth-child(7)").text());
						$(".timer-input .time-digit:nth-child(7)").text(0);
						break;
					case 11:
						$(".timer-input .time-digit:nth-child(11)").text($(".timer-input .time-digit:nth-child(10)").text());
						$(".timer-input .time-digit:nth-child(10)").text(0);
						break;
				}
						
			}else if(event.which == 13){
				$("#hours-cursor").removeClass("cursor");
    			$("#minutes-cursor").removeClass("cursor");
    			$("#days-cursor").removeClass("cursor");
    			$("#seconds-cursor").removeClass("cursor");
				canType = false;
				deleteOldTimers();
				createTimers();
			}
			
		}else{
			return;
		}
	});
	    
});

document.addEventListener("up finished", function(e){$('#countUpStart').text('Times Up!!');},false);
document.addEventListener("down finished", function(e){$('#countDownStart').text('Times Up!!');},false);

function deleteOldTimers(){
	if(typeof countDownStopWatch != "undefined"){
		delete(countDownStopWatch);
	}
	
	if(typeof countUpStopWatch != "undefined"){
		delete(countUpStopWatch);
	}
}

function createTimers(){

	updateInputTime();
	
	if(typeof countDownStopWatch == "undefined"){
		$('#countDownStart').text('Start');
		countDownStopWatch = new StopWatch("down",inputDays,inputHours,inputMinutes,inputSeconds);
	}
	
	if(typeof countUpStopWatch == "undefined"){
		countUpStopWatch = new StopWatch("up",inputDays,inputHours,inputMinutes,inputSeconds);
		$('#countUpStart').text('Start');
	}
	
	updateTimerDisplay(countDownStopWatch.display);
	updateTimerDisplay(countUpStopWatch.updateDisplay());
}

function updateInputTime(){
	inputDays =  Number($(".timer-input .time-digit:nth-child(1)").text()+$(".timer-input .time-digit:nth-child(2)").text());
	inputHours =  Number($(".timer-input .time-digit:nth-child(4)").text()+$(".timer-input .time-digit:nth-child(5)").text());
	inputMinutes =  Number($(".timer-input .time-digit:nth-child(7)").text()+$(".timer-input .time-digit:nth-child(8)").text());
	inputSeconds =  Number($(".timer-input .time-digit:nth-child(10)").text()+$(".timer-input .time-digit:nth-child(11)").text());
}

function updateTimerDisplay(updatedInfo){
	switch(updatedInfo.direction){
		case "up":
			var days = ("0" + updatedInfo.days).slice(-2)
			$("#countUp .display-digit:nth-child(1)").text((days)[0]);
			$("#countUp .display-digit:nth-child(2)").text((days)[1]);
			var hours = ("0" + updatedInfo.hours).slice(-2)
			$("#countUp .display-digit:nth-child(4)").text((hours)[0]);
			$("#countUp .display-digit:nth-child(5)").text((hours)[1]);
			var minutes = ("0" + updatedInfo.minutes).slice(-2)
			$("#countUp .display-digit:nth-child(7)").text((minutes)[0]);
			$("#countUp .display-digit:nth-child(8)").text((minutes)[1]);
			var seconds = ("0" + updatedInfo.seconds).slice(-2)
			$("#countUp .display-digit:nth-child(10)").text((seconds)[0]);
			$("#countUp .display-digit:nth-child(11)").text((seconds)[1]);
			break;
		case "down":
			var days = ("0" + updatedInfo.days).slice(-2)
			$("#countDown .display-digit:nth-child(1)").text((days)[0]);
			$("#countDown .display-digit:nth-child(2)").text((days)[1]);
			var hours = ("0" + updatedInfo.hours).slice(-2)
			$("#countDown .display-digit:nth-child(4)").text((hours)[0]);
			$("#countDown .display-digit:nth-child(5)").text((hours)[1]);
			var minutes = ("0" + updatedInfo.minutes).slice(-2)
			$("#countDown .display-digit:nth-child(7)").text((minutes)[0]);
			$("#countDown .display-digit:nth-child(8)").text((minutes)[1]);
			var seconds = ("0" + updatedInfo.seconds).slice(-2)
			$("#countDown .display-digit:nth-child(10)").text((seconds)[0]);
			$("#countDown .display-digit:nth-child(11)").text((seconds)[1]);
			break;
	}
}





function StopWatch (timerType, numDays, numHours, numMinutes, numSeconds){
	//static properties
	this.oneDay = 1000 * 60 * 60 * 24;
	this.oneHour = 1000 * 60 * 60;
	this.oneMinute  = 1000 * 60;
	this.oneSecond = 1000;
	
	//class properties
	this.timerType = timerType;
	this.numDays = Number(numDays);
	this.numHours = Number(numHours);
	this.numMinutes = Number(numMinutes);
	this.numSeconds = Number(numSeconds);
	this.display = {direction: this.timerType, days: this.numDays, hours: this.numHours, minutes: this.numMinutes, seconds: this.numSeconds};
	this.totalTime = (this.numDays * this.oneDay) + (this.numHours * this.oneHour) + (this.numMinutes * this.oneMinute) + (this.numSeconds * this.oneSecond);
	this.timeLeft = this.totalTime;
	this.timePassed = 0;

}

StopWatch.prototype.start = function(){
	var delegate = function(that, method){
		return function(){
			return method.call(that)
		}
	};
	
	if(this.totalTime == 0){
		alert("Please set the timer");
		return "Start";
	}else if(this.totalTime > 0){
		this.timerHandle = setInterval(delegate(this, this.tick), this.oneSecond);
		return "Pause";
	}
	
}

StopWatch.prototype.pause = function(){
	clearInterval(this.timerHandle);
	return "Start";
}

StopWatch.prototype.reset = function(){
	this.pause();
	this.timeLeft = this.totalTime;
	this.timePassed = 0;
	this.updateDisplay();
	return "Start";
}

StopWatch.prototype.tick = function(){
	
	if(this.timePassed == this.totalTime){
		this.reset();
		var newDisplay = this.updateDisplay();
		updateTimerDisplay(newDisplay);
		
		switch(this.timerType){
			case 'up':
				var event = new Event('up finished');
				document.dispatchEvent(event);
				break;
			case 'down':
				var event = new Event('down finished');
				document.dispatchEvent(event);
				break;
		}
		
		return;
	}
	
	this.timeLeft -= this.oneSecond;
	this.timePassed += this.oneSecond;
	
	var newDisplay = this.updateDisplay();
	updateTimerDisplay(newDisplay);

}

StopWatch.prototype.updateDisplay = function(){
	
	if(this.timerType == "up"){
	
		this.numDays = Math.floor(this.timePassed / this.oneDay);
		this.numHours = Math.floor((this.timePassed / this.oneHour) - (this.numDays * 24));
		this.numMinutes = Math.floor((this.timePassed / this.oneMinute) - (this.numDays * 24 * 60) - (this.numHours * 60));
		this.numSeconds = Math.floor((this.timePassed / this.oneSecond) - (this.numDays * 24 * 60 * 60) - (this.numHours * 60 * 60) - (this.numMinutes * 60));
		
		this.display = {direction: this.timerType, days: this.numDays, hours: this.numHours, minutes: this.numMinutes, seconds: this.numSeconds};
	
		return this.display;
	
	}else if(this.timerType == "down"){
	
		this.numDays = Math.floor(this.timeLeft / this.oneDay);
		this.numHours = Math.floor((this.timeLeft / this.oneHour) - (this.numDays * 24));
		this.numMinutes = Math.floor((this.timeLeft / this.oneMinute) - (this.numDays * 24 * 60) - (this.numHours * 60));
		this.numSeconds = Math.floor((this.timeLeft / this.oneSecond) - (this.numDays * 24 * 60 * 60) - (this.numHours * 60 * 60) - (this.numMinutes * 60));
		
		this.display = {direction: this.timerType, days: this.numDays, hours: this.numHours, minutes: this.numMinutes, seconds: this.numSeconds};
	
		return this.display;
	}
}

