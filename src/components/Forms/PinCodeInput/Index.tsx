import { motion } from "framer-motion"
import { useRef, useState } from "react"

type PinCodeInputProps = {
  length?: number // Number of input boxes
  onComplete?: (code: string) => void // Callback when all inputs are filled
  className?: string // Custom class for inputs
}

const PinCodeInput: React.FC<PinCodeInputProps> = ({ length = 6, onComplete, className = "" }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [values, setValues] = useState<string[]>(Array(length).fill(""))

  const handleChange = (value: string, index: number) => {
    const updatedValues = [...values]
    updatedValues[index] = value

    setValues(updatedValues)

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    if (updatedValues.every(val => val !== "")) {
      onComplete?.(updatedValues.join(""))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (values[index] === "" && index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const handleFocus = (index: number) => {
    if (values[index] === "") {
      inputsRef.current[index]?.setSelectionRange(0, 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text").slice(0, length)
    const updatedValues = Array(length).fill("")

    // Distribute the pasted characters into inputs
    pasteData.split("").forEach((char, index) => {
      if (index < length) {
        updatedValues[index] = char
      }
    })

    setValues(updatedValues)

    // Trigger the onComplete callback if all inputs are filled
    if (updatedValues.every(val => val !== "")) {
      onComplete?.(updatedValues.join(""))
    }

    // Focus the first empty input (if any)
    const firstEmptyIndex = updatedValues.findIndex(val => val === "")
    if (firstEmptyIndex !== -1) {
      inputsRef.current[firstEmptyIndex]?.focus()
    } else {
      inputsRef.current[length - 1]?.focus()
    }
  }

  return (
    <form dir="ltr" className="flex w-full justify-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <motion.input
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ delay: i / 10, duration: 0.6, type: "spring" }}
          key={i}
          ref={el => (inputsRef.current[i] = el)}
          type="text"
          maxLength={1}
          value={values[i]}
          onChange={e => handleChange(e.target.value, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          onFocus={() => handleFocus(i)}
          onPaste={handlePaste}
          placeholder={`${i + 1}`}
          className={`focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block size-9 rounded-lg border border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 outline-none focus:border-2 focus:bg-yellow-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${className}`}
          required
        />
      ))}
    </form>
  )
}

export default PinCodeInput
