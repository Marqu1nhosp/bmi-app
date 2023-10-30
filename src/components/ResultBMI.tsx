import { ResultBMIContext } from '@/contexts/ResultBMIContext'
import { useContext } from 'react'

export function ResultBMI() {
  const { messageBMI, resultBMIFormData } = useContext(ResultBMIContext)
  const resultBMIFormDataFormart = resultBMIFormData.toFixed(2)

  return (
    <div className="bg-[#0b1f3d] ">
      <div className="ml-10 mt-4 max-w-xs py-16 px-4 bg-white shadow-lg rounded-lg mr-10 ">
        <div className="flex justify-center md:justify-end -mt-16"></div>
        <div>
          <header className="text-gray-800 text-3xl font-semibold mt-6">
            Resultado:
          </header>
          <strong className="mt-2">
            Seu IMC é de {resultBMIFormDataFormart} kg/m2.
          </strong>
          <p className="mt-2">
            De acordo com a Organização Mundial da Saúde, seu IMC é {messageBMI}{' '}
            para a sua altura.
          </p>
        </div>
      </div>
    </div>
  )
}
