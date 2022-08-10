import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState: setGlobalStateAmount, useGlobalState: useGlobalStateAmount } =
  createGlobalState({
    min: 10,
    max: '2000',
    step: '10',
    defaultValue: '400',
  })

const { setGlobalState: setGlobalStateTerm, useGlobalState: useGlobalStateTerm } =
  createGlobalState({
    min: 3,
    max: 30,
    step: 1,
    defaultValue: '15',
  })

const { setGlobalState: setGlobalStateLoan, useGlobalState: useGlobalStateLoan } =
  createGlobalState({
    totalPrincipal: '1000',
    term: '5',
    totalCostOfCredit: 100,
    totalRepayableAmount: 1200,
    monthlyPayment: 240,
  })

export {
  setGlobalStateAmount,
  useGlobalStateAmount,
  setGlobalStateTerm,
  useGlobalStateTerm,
  setGlobalStateLoan,
  useGlobalStateLoan,
}
