function normalize(value) {
  if (!value) {
    return 0;
  }

  return Number(String(value).replace(/[,%]/g, ''));
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

var format = formatter();
var formatPercentage = formatter({ suffix: '%' });
function fmt(number) {
  return format(normalize(number));
}

function fmtP(percentage) {
  return formatPercentage(normalize(percentage));
}

var percentageFields = ['taxPercent', 'percentOfIncomeSaved', 'interestRate'];
function changeFieldValue(key) {
  var input = document.getElementById(key);
  if (input) {
    var formatFunction = percentageFields.indexOf(key) === -1 ? fmt : fmtP;
    input.value = formatFunction(window.fi[key]);
  }
}

window.fi = {};
var inputs = document.querySelectorAll('input');

var inputListener = function (event) {
  event.target.value = fmt(event.target.value);
  window.fi[event.target.id] = normalize(event.target.value);

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
};

function addInputListeners(input) {
  input.addEventListener('input', inputListener);
}

inputs.forEach(addInputListeners);
