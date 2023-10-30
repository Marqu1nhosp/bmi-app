/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ReactNode, createContext, useState } from 'react'

interface ResultBMIProps {
  children: ReactNode
}

interface ResultBMIData {
  resultBMIFormData: number
  setResultBMIFormDataContext: (value: number) => void
  messageBMI: string
  setMessageBMIDataContext: (value: string) => void
}

export const ResultBMIContext = createContext({} as ResultBMIData)

export function ResultBMIProvider({ children }: ResultBMIProps) {
  const [resultBMIFormData, setResultBMIFormDataContext] = useState(0)
  const [messageBMI, setMessageBMIDataContext] = useState('')

  return (
    <ResultBMIContext.Provider
      value={{
        resultBMIFormData,
        messageBMI,
        setMessageBMIDataContext,
        setResultBMIFormDataContext,
      }}
    >
      {children}
    </ResultBMIContext.Provider>
  )
}
