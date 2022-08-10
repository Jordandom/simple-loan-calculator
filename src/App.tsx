import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Calculator from './components/Calculator'
import { CssBaseline } from '@mui/material'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Calculator />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
