import axios from 'axios'

export interface FirstLoanOffer {
  totalPrincipal: string
  term: string
  totalCostOfCredit: number
  totalRepayableAmount: number
  monthlyPayment: number
}

export const getIntervalCollection = async () => {
  const { data } = await axios.get(
    `http://js-developer-second-round.herokuapp.com/api/v1/application/constraints`,
  )
  return data
}

export const getFirstLoanOfferCollection = async (
  amount: number | string,
  term: number | string,
) => {
  const { data } = await axios.get(
    `https://js-developer-second-round.herokuapp.com/api/v1/application/real-first-loan-offer?amount=${amount}&term=${term}`,
  )
  return data
}
