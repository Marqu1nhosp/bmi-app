'use client'
import { ResultBMIProvider } from '@/contexts/ResultBMIContext'
import { FormBMI } from '../components/FormBMI'
import '../styles/global.css'

export default function Home() {
  return (
    <ResultBMIProvider>
      <FormBMI />
    </ResultBMIProvider>
  )
}
