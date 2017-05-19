import formatNumber from 'format-number';
import {
  calculateExpectedReturnRate,
  calculateTargetSum,
  deductPercentage,
  deductTaxPercentageFromIncome,
  normalize,
  savingYearsNeededForRetirement,
} from '../util/calculations';

const format = formatNumber();
const formatPercentage = formatNumber({ suffix: '%' });
const fmt = number => (format(normalize(number)));
const fmtP = percentage => (formatPercentage(normalize(percentage)));

export default (state) => {
  const stateCopy = { ...state };

  const {
    amountSavedSoFar,
    income,
    taxPercent,
    percentOfIncomeSaved,
    expenditures,
    expenditureIsAnnual,
    interestRate,
  } = stateCopy;

  const incomeAfterTax = deductTaxPercentageFromIncome(income, taxPercent);
  const targetSum = calculateTargetSum(expenditures, expenditureIsAnnual);
  const amountOfIncomeSaved = deductPercentage(incomeAfterTax, percentOfIncomeSaved);
  const expectedReturnRate = calculateExpectedReturnRate(interestRate);
  const amountOfYearsSavingNeededForRetirement =
    savingYearsNeededForRetirement(normalize(amountSavedSoFar), targetSum, amountOfIncomeSaved, expectedReturnRate);

  return {
    ...stateCopy,

    income: fmt(income),
    taxPercent: fmtP(taxPercent),
    incomeAfterTax: fmt(incomeAfterTax),
    percentOfIncomeSaved: fmtP(percentOfIncomeSaved),
    amountOfIncomeSaved: fmt(amountOfIncomeSaved),

    amountSavedSoFar: fmt(amountSavedSoFar),
    interestRate: fmtP(interestRate),

    expenditures: fmt(expenditures),

    targetSum: fmt(targetSum),
    expectedReturnRate,
    amountOfYearsSavingNeededForRetirement,
  };
};
