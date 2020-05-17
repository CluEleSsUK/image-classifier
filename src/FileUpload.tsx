import React, { useState } from "react"

interface FileUploadProps {
  label?: string
  buttonLabel?: string
  onComplete: (imageData: string) => Promise<void>
}

const FileUpload = (props: FileUploadProps) => {
  const [file, setFile] = useState<any>()

  const onFileUploaded = (event: any) => {
    const fileBlob = event.target.files?.[0]
    if (!fileBlob) {
      return
    }

    const reader = new FileReader()
    reader.onload = (res: any) => setFile(res.target.result)
    reader.readAsDataURL(fileBlob)
  }

  const onComplete = () => {
    if (!file) {
      return
    }

    props.onComplete(file)
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <p>{props.label}</p>
      <input
        type={"file"}
        onChange={onFileUploaded}
      />
      <button
        disabled={file == null}
        onClick={onComplete}
      >{props.buttonLabel}</button>
    </form>
  );
}

export { FileUpload }