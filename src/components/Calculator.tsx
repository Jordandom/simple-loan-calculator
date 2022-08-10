import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getIntervalCollection,
  getFirstLoanOfferCollection,
  FirstLoanOffer,
} from '../api/api'
import {
  Card,
  Slider,
  styled,
  Divider,
  Select,
  SelectChangeEvent,
  MenuItem,
  CircularProgress,
  Box,
} from '@mui/material'
import {
  useGlobalStateAmount,
  setGlobalStateAmount,
  useGlobalStateTerm,
  setGlobalStateTerm,
} from '../state/state'
import { amounts, intervals } from './dropdownValues'

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const StyledCalculator = styled(Card)`
  min-width: 384px;
`
const GreenBox = styled('div')`
  background-color: #a3cd3a;
  padding: 16px;
`
const LoanTotal = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TotalAmount = styled('div')`
  color: white;
  font-weight: bold;
`

const Amount = styled('div')`
  color: white;
  font-weight: bold;
  font-size: 32px;
`
const LoanMinMax = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ControlsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`
const WhiteBoxWrapper = styled('div')`
  background-color: whitesmoke;
  padding: 16px;
`

const WhiteBoxRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 10px 0;
  &:last-of-type {
    border: none;
    padding: 10px 0 0 0;
  },
`

const LoadingBox = styled('div')`
  height: 246px;
  padding: 16px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GreenAmounts = styled('div')`
  color: #10652c;
  font-weight: bold;
`

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: '#10652c',
  '& .MuiSlider-thumb': {
    backgroundColor: '#ffffff',
    border: '1px solid currentColor',
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: '#ffffff',
    opacity: 1,
    height: 3,
  },
}))

const Calculator = () => {
  // HOOKS
  const [amount] = useGlobalStateAmount('defaultValue')
  const [term] = useGlobalStateTerm('defaultValue')
  // FETCHED DATA
  const { isLoading, error, data } = useQuery(['intervalData'], getIntervalCollection)
  const amountInterval = data?.amountInterval
  const termInterval = data?.termInterval
  const { data: firstLoanOfferData, isFetching } = useQuery<FirstLoanOffer>(
    ['firstLoanData', amount, term],

    () => getFirstLoanOfferCollection(amount, term),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    },
  )

  // HANDLERS
  const handleSliderAmountChange = (event: Event, newValue: any) => {
    setGlobalStateAmount('defaultValue', newValue)
  }
  const handleSelectAmountChange = (event: SelectChangeEvent) => {
    setGlobalStateAmount('defaultValue', event.target.value)
  }
  const handleSliderTermChange = (event: Event, newValue: any) => {
    setGlobalStateTerm('defaultValue', newValue)
  }
  const handleSelectTermChange = (event: SelectChangeEvent) => {
    setGlobalStateTerm('defaultValue', event.target.value)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>error</h1>
  }

  return (
    <Wrapper>
      <StyledCalculator>
        <GreenBox>
          <LoanTotal>
            <TotalAmount>Total amount</TotalAmount>
            <Amount>$ {amount}</Amount>
          </LoanTotal>
          <ControlsWrapper>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={amount}
              label='Age'
              onChange={handleSelectAmountChange}
            >
              {amounts.map((amount, index) => (
                <MenuItem value={amount} key={index}>
                  {amount}
                </MenuItem>
              ))}
            </Select>
            <CustomSlider
              value={typeof amount === 'number' ? amount : 400}
              onChange={handleSliderAmountChange}
              min={amountInterval.min}
              max={amountInterval.max}
              step={amountInterval.step}
              aria-labelledby='input-slider'
            />
            <LoanMinMax>
              <div>{amountInterval.min}</div>
              <div>{amountInterval.max}</div>
            </LoanMinMax>
          </ControlsWrapper>
          <Divider sx={{ backgroundColor: 'white', margin: '16px 0' }} />
          <LoanTotal>
            <TotalAmount>Term</TotalAmount>
            <Amount>{term}</Amount>
          </LoanTotal>
          <ControlsWrapper>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={term}
              label='Age'
              onChange={handleSelectTermChange}
            >
              {intervals.map((interval, index) => (
                <MenuItem value={interval} key={index}>
                  {interval}
                </MenuItem>
              ))}
            </Select>
            <CustomSlider
              value={typeof term === 'number' ? term : 15}
              onChange={handleSliderTermChange}
              min={termInterval.min}
              max={termInterval.max}
              step={termInterval.step}
              aria-labelledby='input-slider'
            />
            <LoanMinMax>
              <div>{termInterval.min}</div>
              <div>{termInterval.max}</div>
            </LoanMinMax>
          </ControlsWrapper>
        </GreenBox>
        {isFetching ? (
          <LoadingBox>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress sx={{ color: '#10652c' }} />
            </Box>
          </LoadingBox>
        ) : (
          <WhiteBoxWrapper>
            <WhiteBoxRow>
              <div>Total principal</div>
              <div>
                <strong>$ {firstLoanOfferData?.totalPrincipal}</strong>
              </div>
            </WhiteBoxRow>
            <WhiteBoxRow>
              <div>Term</div>
              <div>
                <strong>{firstLoanOfferData?.term} days</strong>
              </div>
            </WhiteBoxRow>
            <WhiteBoxRow>
              <div>
                <strong>Total cost of credit</strong>
              </div>
              <GreenAmounts>
                $ {firstLoanOfferData?.totalCostOfCredit.toFixed(2)}
              </GreenAmounts>
            </WhiteBoxRow>
            <WhiteBoxRow>
              <div>
                <strong>Total repayable amount</strong>
              </div>
              <GreenAmounts>
                $ {firstLoanOfferData?.totalRepayableAmount.toFixed(2)}
              </GreenAmounts>
            </WhiteBoxRow>
            <WhiteBoxRow>
              <div>
                <strong>Monthly payment</strong>
              </div>
              <GreenAmounts>
                $ {firstLoanOfferData?.monthlyPayment.toFixed(2)}
              </GreenAmounts>
            </WhiteBoxRow>
          </WhiteBoxWrapper>
        )}
      </StyledCalculator>
    </Wrapper>
  )
}
export default Calculator
