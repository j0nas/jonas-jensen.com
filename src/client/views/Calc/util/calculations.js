export const normalize = (value = '') =>
  (Number(value.replace(/[,%]/g, '')));

export const addAnnualSavingAndCompoundInterest = (initialAmount, amountToAdd, interestRate) =>
  ((initialAmount + amountToAdd) * interestRate);


export const savingYearsNeededForRetirement = (savedSoFar, targetSum, incomeAmountSaved, returnRate) => {
  let accumulatedSavings = savedSoFar;
  let amountOfYearsSavingNeededForRetirement = 0;
  const maxYearsToCheck = 100;

  while ((accumulatedSavings < targetSum) && (amountOfYearsSavingNeededForRetirement < maxYearsToCheck)) {
    accumulatedSavings = addAnnualSavingAndCompoundInterest(accumulatedSavings, incomeAmountSaved, returnRate);
    amountOfYearsSavingNeededForRetirement += 1;
  }

  return amountOfYearsSavingNeededForRetirement;
};

export const deductTaxPercentageFromIncome = (income, taxPercent) =>
  (Math.round(normalize(income) * (1 - (normalize(taxPercent) / 100))));

export const calculateTargetSum = (expenditures, expenditureIsAnnual) =>
  (normalize(expenditures) * 25 * (expenditureIsAnnual ? 1 : 12));

export const deductPercentage = (value, percentageToDeduct) =>
  (value * (normalize(percentageToDeduct) / 100));

export const calculateExpectedReturnRate = interestRate =>
  (1 + (normalize(interestRate) / 100));
