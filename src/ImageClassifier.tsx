import React from "react"
import { WithTensorflow } from "./TensorflowProvider"
import { FileUpload } from "./FileUpload"
import { useState } from "react"

interface ImageClassifierProps extends WithTensorflow {}

const ImageClassifier = (props: ImageClassifierProps) => {
  const [result, setResult] = useState("")
  const [lastImage, setLastImageData] = useState<string>()

  if (props.isLoading) {
    return <p>...loading</p>
  }

  const classifyImage = async (imageData: string): Promise<void> => {
    if (props.client == null) {
      setResult("There was an error initialising the client!")
    }

    const image = asHtmlImageElement(imageData)

    const classification = await props.client?.classify(image)

    if (!classification || classification.length === 0) {
      setResult("No result for classifying this image :(")
    } else {
      setLastImageData(imageData)
      setResult(resultFormatter(classification[0]))
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FileUpload
        label={"Upload an image to be classified"}
        buttonLabel={"Classify"}
        onComplete={classifyImage}
      />

      {lastImage && <img src={lastImage} alt={"Last"} />}
      {result}
    </div>
  )
}

function asHtmlImageElement(imageData: string): HTMLImageElement {
  const img = document.createElement("img")
  img.src = imageData
  // requires dimensions to be correctly parsed by Tensorflow
  img.height = 400
  img.width = 200
  return img
}

function resultFormatter({ className: classification, probability, }: any) {
  return `${classification} with probability ${probability}`
}

export { ImageClassifier }