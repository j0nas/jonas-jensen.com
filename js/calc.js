import formatter from "format-number";

function normalize(value) {
  return !value ? 0 : Number(String(value).replace(/[,%]/g, ''));
}

function addAnnualSavingAndCompoundInterest(initialAmount, amountToAdd, interestRate) {
  return (initialAmount + amountToAdd) * interestRate;
}

function savingYearsNeededForRetirement(savedSoFar, targetSum, incomeAmountSaved, returnRate) {
  var accumulatedSavings = savedSoFar;
  var amountOfYearsSavingNeededForRetirement = 0;
  var maxYearsToCheck = 100;

  while ((accumulatedSavings < targetSum) && (amountOfYearsSavingNeededForRetirement < maxYearsToCheck)) {
    accumulatedSavings = addAnnualSavingAndCompoundInterest(accumulatedSavings, incomeAmountSaved, returnRate);
    amountOfYearsSavingNeededForRetirement += 1;
  }

  return amountOfYearsSavingNeededForRetirement;
}

function deductTaxPercentageFromIncome(income, taxPercent) {
  return (Math.round(normalize(income) * (1 - (normalize(taxPercent) / 100))));
}

function calculateTargetSum(expenditures, expenditureIsAnnual) {
  return (normalize(expenditures) * 25 * (expenditureIsAnnual ? 1 : 12));
}

function deductPercentage(value, percentageToDeduct) {
  return (value * (normalize(percentageToDeduct) / 100));
}

function calculateExpectedReturnRate(interestRate) {
  return (1 + (normalize(interestRate) / 100));
}

window.fi = {};
var inputs = document.querySelectorAll('input');
var format = formatter();
var formatPercentage = formatter({suffix: '%'});
var percentageFields = ['taxPercent', 'percentOfIncomeSaved', 'interestRate'];

function changeFieldValue(key) {
  var input = document.getElementById(key);
  if (input) {
    var formatFunction = percentageFields.indexOf(key) === -1 ? format : formatPercentage;
    input.value = formatFunction(window.fi[key]);
  }
}

function inputListener(event) {
  if (event.target.type === 'checkbox') {
    window.fi[event.target.id] = event.target.checked;
    var expenditureTimeSpan = document.getElementById('expenditureTimeSpan');
    if (expenditureTimeSpan) {
      expenditureTimeSpan.textContent = event.target.checked ? 'year' : 'month';
    }
  } else {
    window.fi[event.target.id] = normalize(event.target.value);
  }

  window.fi.incomeAfterTax = deductTaxPercentageFromIncome(window.fi.income, window.fi.taxPercent);
  window.fi.targetSum = calculateTargetSum(window.fi.expenditures, window.fi.expenditureIsAnnual);
  window.fi.amountOfIncomeSaved = deductPercentage(window.fi.incomeAfterTax, window.fi.percentOfIncomeSaved);
  window.fi.expectedReturnRate = calculateExpectedReturnRate(window.fi.interestRate);
  window.fi.amountOfYearsSavingNeededForRetirement =
    savingYearsNeededForRetirement(
      window.fi.amountSavedSoFar,
      window.fi.targetSum,
      window.fi.amountOfIncomeSaved,
      window.fi.expectedReturnRate
    );

  Object.keys(window.fi).forEach(changeFieldValue);
}

function addInputListeners(input) {
  input.addEventListener('input', inputListener);
}

for (var inputIndex = 0; inputIndex < inputs.length - 1; inputIndex++)
  addInputListeners(inputs[inputIndex]);

document.getElementById('expenditureIsAnnual').addEventListener('click', inputListener);