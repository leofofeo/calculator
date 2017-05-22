//JS and jQuery for RQ
$('document').ready(function(){
	$('#btn-input-ce').addClass('disabled');
});


var ReadyToCalculate = false;
var CurrentInputDisplay = '';
var PreviousCalculationMethod = '';


$('button').on('click', function(){
	var btn = $(this);
	if($(btn).hasClass('input-number')){
		
		CurrentInputDisplay += $(btn).val();
		displayCurrentInput();

	} else {

		var currOperation;
		prevOperation = PreviousCalculationMethod;
		switch($(btn).val()){
			case 'AC':
				clearAll();
				return;
				break;
			case 'CE':
				clearLastEntry();
				return;
				break;
			default:
				currOperation = $(btn).val();
		}

		if (ReadyToCalculate){
			// parse and calculate current value;
			parseCurrentValue(currOperation, prevOperation, $(btn).val());
			ReadyToCalculate = false;

		} else {
			PreviousCalculationMethod = $(btn).val();
			ReadyToCalculate = true;
			CurrentInputDisplay += $(btn).val();
			
		}

		displayCurrentInput();
	}
	
});
	



var parseCurrentValue = function(currOperation, prevOperation, btnVal){
	console.log('Ready to calculate:' + ReadyToCalculate);
	console.log(CurrentInputDisplay);
	currentValueArray = CurrentInputDisplay.split(prevOperation);
	console.log(currentValueArray);
	firstValue = currentValueArray[0];
	secondValue = currentValueArray[1];
	switch(prevOperation){
		case '+':
			addInputs(firstValue, secondValue);
			break;
		case '-':
			subtractInputs(firstValue, secondValue);
			break;
		case '/':
			divideInputs(firstValue, secondValue);
			break;
		case 'x':
			console.log(btnVal);
			multiplyInputs(firstValue, secondValue);
			break;
		case '%':
			modulusInputs(firstValue, secondValue);
			break;
	}
	PreviousCalculationMethod = prevOperation;
}


var addInputs = function(first, second){
	console.log('from adding');
	currentTotal = parseFloat(first) + parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	displayCurrentInput();
}

var subtractInputs = function(first, second){
	console.log('from subtracting');
	currentTotal = parseFloat(first) - parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	displayCurrentInput();
}

var multiplyInputs = function(first, second){
	console.log('from multiplying');
	currentTotal = parseFloat(first) * parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	displayCurrentInput();
}

var divideInputs = function(first, second){
	console.log('from dividing');
	currentTotal = parseFloat(first) / parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	displayCurrentInput();
}

var modulusInputs = function(first, second){
	console.log('from modulus');
	currentTotal = parseFloat(first) % parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	displayCurrentInput();

}


var checkForExtendedDecimal = function(currentTotal){
	if(String(currentTotal).indexOf('.') === -1){
		return currentTotal;
	} else {
		var mySplit = String(currentTotal).split('.');
		if(mySplit[1].length > 2){
			return currentTotal.toFixed(2);
		}
	}

	return currentTotal;
}


var clearAll = function(){
	$('input').val('');
	ReadyToCalculate = false;
	PreviousCalculationMethod = '';
	CurrentInputDisplay = '';
}

var clearLastEntry = function(){
	console.log('from CE function');
}


var displayCurrentInput = function(){
	$('input').val(CurrentInputDisplay);
}