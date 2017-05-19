import React from 'react';
import { Input } from 'light-form';
import Links from '../../../components/Links';
import './style.scss';

/* eslint-disable */
const N = ({name, disabled, label, type}) =>
  <div className="input-row">
    <label htmlFor={name} className="input-label">{label}</label>
    <Input disabled={disabled} name={name} className="input" type={type || "text"}/>
  </div>;

const Main = ({expenditureIsAnnual}) => (
  <div className="input-container">
    <Links />
    <N name="fi.income" label="Income" />
    <N name="fi.taxPercent" label="Tax"/>
    <N name="fi.incomeAfterTax" label="Post-tax income" disabled/>
    <N name="fi.percentOfIncomeSaved" label="% of income saved"/>
    <N name="fi.amountOfIncomeSaved" label="Income saved" disabled/>
    <div className="separator"/>

    <N name="fi.amountSavedSoFar" label="Saved up so far" />
    <N name="fi.interestRate" label="Interest rate %"/>
    <div className="separator"/>

    <N name="fi.expenditures" label={`Expenses/${expenditureIsAnnual ? "year" : "month"}`}/>
    <N name="fi.expenditureIsAnnual" label="Annual expenses?" type="checkbox"/>
    <div className="separator"/>

    <N name="fi.targetSum" label="Saving target sum" disabled/>
    <N name="fi.amountOfYearsSavingNeededForRetirement" label="Years to FI" disabled/>
  </div>
);

export default Main;
