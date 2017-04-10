import React from 'react';
import CurrencyInput from 'react-currency-input';
import Links from '../../../components/Links';
import './style.scss';

/* eslint-disable */
const N = ({onChange, name, value, precision = 0, suffix, disabled, className}) =>
    <div className="input-row">
        <label htmlFor={name} className="input-label">{name}</label>
        <CurrencyInput
            precision={precision}
            value={value}
            onChange={newValue => onChange(name, newValue)}
            suffix={suffix}
            disabled={disabled}
            name={name}
            className="input"
        />
    </div>;

const normalize = (value = '') =>
    (Number(value.replace(/[,%]/, "")));

const addAnnualSavingAndCompountInterest = (initialAmount, amountToAdd, interestRate) =>
    ((initialAmount + amountToAdd) * interestRate);

const Main = ({
                  amountSavedSoFar,
                  income,
                  taxPercent,
                  percentOfIncomeSaved,
                  expenditures,
                  expenditureIsAnnual,
                  interestRate,
                  update,
              }) => {

    const incomeAfterTax = Math.round(normalize(income) * (1 - (normalize(taxPercent) / 100)));
    const targetSum = normalize(expenditures) * 25 * (expenditureIsAnnual ? 1 : 12);
    const amountOfIncomeSaved = incomeAfterTax * (normalize(percentOfIncomeSaved) / 100);
    const expectedReturnRate = 1 + (normalize(interestRate) / 100);

    let accumulatedSavings = normalize(amountSavedSoFar);
    let amountOfYearsSavingNeededForRetirement = 0;
    while ((accumulatedSavings < targetSum) && (amountOfYearsSavingNeededForRetirement < 100)) {
        accumulatedSavings = addAnnualSavingAndCompountInterest(
            accumulatedSavings,
            amountOfIncomeSaved,
            expectedReturnRate,
        );
        amountOfYearsSavingNeededForRetirement++;
    }

    return (
        <div className="input-container">
            <Links />
            <N onChange={update} name="income" value={income}/>
            <N onChange={update} name="taxPercent" value={taxPercent} suffix="%"/>
            <N name="incomeAfterTax" value={incomeAfterTax} disabled/>
            <N onChange={update} name="percentOfIncomeSaved" value={percentOfIncomeSaved} suffix="%"/>
            <N name="amountOfIncomeSaved" value={amountOfIncomeSaved} disabled/>
            <div className="separator"/>

            <N onChange={update} name="amountSavedSoFar" value={amountSavedSoFar}/>
            <N onChange={update} name="interestRate" value={interestRate} precision={4} suffix="%"/>
            <div className="separator"/>

            <div className="input-row">
                <label htmlFor="expenditures" className="input-label">
                    {expenditureIsAnnual ? "Annual" : "Monthly"} expenditures
                </label>
                <CurrencyInput
                    onChange={newValue => update("expenditures", newValue)}
                    value={expenditures}
                    precision={0}
                    className="input"
                    name="expenditures"
                />
            </div>
            <div className="input-row">
                <label htmlFor="expenditureIsAnnual" className="input-label">Expenditures are annual?</label>
                <input
                    onChange={e => update("expenditureIsAnnual", e.target.checked)}
                    type="checkbox"
                    value={expenditureIsAnnual}
                    className="input"
                />
            </div>
            <div className="separator"/>

            <N name="targetSum" value={targetSum} disabled/>
            <N name="yearsToRetirement" value={amountOfYearsSavingNeededForRetirement} disabled/>
        </div>
    );
};

export default Main;
