import React from "react"
import { TensorFlowProvider } from "./TensorflowProvider"
import { ImageClassifier } from "./ImageClassifier"
import "./App.css"

function App() {
  return (
    <div className="App">
      <TensorFlowProvider render={props =>
        <ImageClassifier {...props} />}
      />
    </div>
  )
}

export default App;
