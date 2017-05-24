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

//  window.fi[event.target.id] = event.target.value;
  Object.keys(window.fi).forEach(function (key) {
    var input = document.getElementById(key);
    if (input) {
      input.value = fmt(window.fi[key]);
    }
  });


  /*
   var amountSavedSoFar = window.amountSavedSoFar;
   var income = window.income;
   var taxPercent = window.taxPercent;
   var percentOfIncomeSaved = window.percentOfIncomeSaved;
   var expenditures = window.expenditures;
   var expenditureIsAnnual = window.expenditureIsAnnual;
   var interestRate = window.interestRate;

   var incomeAfterTax = deductTaxPercentageFromIncome(income, taxPercent);
   var targetSum = calculateTargetSum(expenditures, expenditureIsAnnual);
   var amountOfIncomeSaved = deductPercentage(incomeAfterTax, percentOfIncomeSaved);
   var expectedReturnRate = calculateExpectedReturnRate(interestRate);
   var amountOfYearsSavingNeededForRetirement = savingYearsNeededForRetirement(normalize(amountSavedSoFar), targetSum, amountOfIncomeSaved, expectedReturnRate);

   window.fi = {
   income: fmt(income),
   taxPercent: fmtP(taxPercent),
   incomeAfterTax: fmt(incomeAfterTax),
   percentOfIncomeSaved: fmtP(percentOfIncomeSaved),
   amountOfIncomeSaved: fmt(amountOfIncomeSaved),
   amountSavedSoFar: fmt(amountSavedSoFar),
   interestRate: fmtP(interestRate),
   expenditures: fmt(expenditures),
   targetSum: fmt(targetSum),
   expectedReturnRate: expectedReturnRate,
   amountOfYearsSavingNeededForRetirement: amountOfYearsSavingNeededForRetirement,
   };

   window.fi[e.target.id] = e.target.value;

   var keys = Object.keys(window.fi);

   const fiProps = Object.getOwnPropertyNames(window.fi);
   fiProps.forEach(function (fiProp) {
   const elementById = document.getElementById(fiProp);
   if (elementById)
   elementById.value = window.fi[fiProp];
   else {
   console.log("element", fiProp, " not found");
   }
   });*/
};

function addInputListeners(input) {
  input.addEventListener('input', inputListener);
}

inputs.forEach(addInputListeners);
