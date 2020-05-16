import { useEffect, useState } from "react"
import * as mobilenet from '@tensorflow-models/mobilenet';
import { MobileNet } from "@tensorflow-models/mobilenet"

interface TensorflowProps {
  render: (output: WithTensorflow) => any
}

const TensorFlowProvider = ({ render }: TensorflowProps) => {
  const [tensorflow, setTensorflow] = useState<MobileNet | null>(null)

  useEffect(() => {
    mobilenet.load()
      .then(it => setTensorflow(it))
      .catch(err => console.log(`Couldn't start tensorflow! ${err}`))
  }, [])

  return render({ isLoading: tensorflow == null, client: tensorflow })
}

export interface WithTensorflow {
  isLoading: boolean,
  client: MobileNet | null
}

export { TensorFlowProvider }