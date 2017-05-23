//JS and jQuery for RQ
$('document').ready(function(){
	$('#btn-input-ce').addClass('disabled');
});


var ReadyToCalculate = false;
var CurrentInputDisplay = '';
var PreviousCalculationMethod = '';


$('button').on('click', function(){
	console.log('ReadyToCalculate: ' + ReadyToCalculate);
	console.log('CurrentInputDisplay: ' + CurrentInputDisplay);
	console.log('PreviousCalculationMethod: ' + PreviousCalculationMethod);
	var btn = $(this);
	if($(btn).hasClass('input-number')){
		if(PreviousCalculationMethod !== ''){
			ReadyToCalculate = true;
		}
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
	currentValueArray = CurrentInputDisplay.split(prevOperation);
	firstValue = currentValueArray[0];
	secondValue = currentValueArray[1];
	switch(prevOperation){
		case '+':
			addInputs(firstValue, secondValue, btnVal);
			break;
		case '-':
			subtractInputs(firstValue, secondValue, btnVal);
			break;
		case '/':
			divideInputs(firstValue, secondValue, btnVal);
			break;
		case 'x':
			multiplyInputs(firstValue, secondValue, btnVal);
			break;
		case '%':
			modulusInputs(firstValue, secondValue, btnVal);
			break;
	}
	PreviousCalculationMethod = currOperation;
}


var addInputs = function(first, second, btnVal){
	console.log('from adding');
	currentTotal = parseFloat(first) + parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	CurrentInputDisplay = checkForEquals(btnVal);
	displayCurrentInput();
}

var subtractInputs = function(first, second, btnVal){
	console.log('from subtracting');
	currentTotal = parseFloat(first) - parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	CurrentInputDisplay = checkForEquals(btnVal);
	displayCurrentInput();
}

var multiplyInputs = function(first, second, btnVal){
	console.log('from multiplying');
	currentTotal = parseFloat(first) * parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	CurrentInputDisplay = checkForEquals(btnVal);
	displayCurrentInput();
}

var divideInputs = function(first, second, btnVal){
	console.log('from dividing');
	currentTotal = parseFloat(first) / parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	CurrentInputDisplay = checkForEquals(btnVal);
	displayCurrentInput();
}

var modulusInputs = function(first, second, btnVal){
	console.log('from modulus');
	currentTotal = parseFloat(first) % parseFloat(second);
	CurrentInputDisplay  = checkForExtendedDecimal(currentTotal);
	CurrentInputDisplay = checkForEquals(btnVal);
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

var checkForEquals = function(btnVal){
	if (btnVal === '='){
		return CurrentInputDisplay;
	} else {
		CurrentInputDisplay += btnVal;
		return CurrentInputDisplay;
	}
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