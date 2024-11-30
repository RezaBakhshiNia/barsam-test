import { motion } from "framer-motion"
import React from "react"
import { UseFormRegister } from "react-hook-form"

type InputProps = {
  name: string // Name and ID for the input
  label: string // Label for the input
  error?: string // Error message to display
  register: UseFormRegister<any> // Register function from react-hook-form
  delay?: number // Animation delay
  parentStyles?: string // Custom styles for the wrapper div
  classInput?: string // Custom styles for the input element
  disable?: boolean // Disable input field
  children?: React.ReactNode // Additional child elements
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({
  name,
  label,
  error,
  register,
  delay = 0,
  parentStyles = "",
  classInput = "",
  disable = false,
  children,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 1.8, type: "spring", delay }}
    className={`border-none ${parentStyles}`}
  >
    <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      id={name}
      disabled={disable}
      {...(register ? register(name) : {})}
      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 focus:bg-yellow-50 focus:shadow-inner focus:ring-gray-400 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400 ${classInput}`}
      {...props}
    />
    {error && <span className="text-rose-500">{error}</span>}
    {children}
  </motion.div>
)

export default Input
