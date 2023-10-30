/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResultBMI } from './ResultBMI'
import { useContext, useState } from 'react'
import { ResultBMIContext } from '@/contexts/ResultBMIContext'

const dataBMIFormSchema = z.object({
  weight: z
    .string()
    .nonempty('O peso é obrigatorio')
    .min(2, 'Precisa de pelo menos 2 números'),
  height: z
    .string()
    .nonempty('Altura é obrigatorio')
    .transform((height) => {
      return (parseFloat(height) / 100).toFixed(2)
    }),
})

type DataBMIProps = z.infer<typeof dataBMIFormSchema>

export function FormBMI() {
  const { setMessageBMIDataContext, setResultBMIFormDataContext } =
    useContext(ResultBMIContext)

  const [resultBMIFormData, setResultBMIFormData] = useState(0)
  const [messageBMI, setMessageBMI] = useState('')

  const [isShowResult, setIsShowResult] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataBMIProps>({
    resolver: zodResolver(dataBMIFormSchema),
  })

  function dataBMI(data: DataBMIProps) {
    const { height, weight } = data

    const weightFormat = parseFloat(weight.replace(',', '.'))
    const heightFormat = parseFloat(height)

    let messageBMI = ''

    const resultBMIForm = weightFormat / (heightFormat * heightFormat)

    if (resultBMIForm <= 16.9) {
      messageBMI = 'Muito abaixo do peso!'
    } else if (resultBMIForm >= 17 && resultBMIForm <= 18.4) {
      messageBMI = 'Abaixo do peso!'
    } else if (resultBMIForm >= 18.5 && resultBMIForm <= 24.9) {
      messageBMI = 'Peso normal!'
    } else if (resultBMIForm >= 25 && resultBMIForm <= 29.9) {
      messageBMI = 'Acima do peso!'
    } else if (resultBMIForm >= 30 && resultBMIForm <= 34.9) {
      messageBMI = 'Obesidade grau I!'
    } else if (resultBMIForm >= 35 && resultBMIForm <= 40) {
      messageBMI = 'Obesidade grau II!'
    } else {
      messageBMI = 'Obesidade grau III!'
    }

    setResultBMIFormData(resultBMIForm)
    setMessageBMI(messageBMI)
    setMessageBMIDataContext(messageBMI)
    setResultBMIFormDataContext(resultBMIForm)
    setIsShowResult(true)
  }

  return (
    <>
      <main className="h-screen bg-[#0b1f3d] flex flex-col gap-3 items-center justify-center">
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-xl">
            Calcular Índice de massa corporal (IMC)
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(dataBMI)}
          className="flex flex-col gap-4 w-full max-w-xs"
          action=""
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white ">
              Peso(KG):{' '}
            </label>
            <input
              placeholder="ex: 60.5 ou 60,5"
              type="text"
              className="border border-zinc-200 rounded shadow-sm  h-8"
              {...register('weight')}
            />
            {errors.weight && (
              <span className="text-red-700">{errors.weight.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white">Altura(cm):</label>
            <input
              placeholder="ex: 185"
              type="text"
              className="border border-zinc-200 rounded shadow-sm h-8"
              {...register('height')}
            />
            {errors.height && (
              <span className="text-red-700">{errors.height.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-700"
          >
            Calcular
          </button>
        </form>

        <div>{isShowResult && <ResultBMI />}</div>
      </main>
    </>
  )
}
