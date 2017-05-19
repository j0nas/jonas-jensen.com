import { UPDATE_FIELD } from '../types/calcTypes';
import {
  calculateExpectedReturnRate,
  calculateTargetSum,
  deductPercentage,
  deductTaxPercentageFromIncome,
  normalize,
  savingYearsNeededForRetirement,
} from '../util/calculations';

export default (state = {}, action) => {
  const stateCopy = { ...state, [action.name]: action.value };
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

  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...stateCopy,
        incomeAfterTax,
        targetSum,
        amountOfIncomeSaved,
        expectedReturnRate,
        amountOfYearsSavingNeededForRetirement,
      };

    default:
      return state;
  }
};
