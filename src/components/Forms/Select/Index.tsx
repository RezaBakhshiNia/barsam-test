import { motion } from "framer-motion"
import React from "react"
import { UseFormRegister } from "react-hook-form"

type SelectProps = {
  label: string // Label for the select input
  name: string // Name and ID for the select input
  children?: React.ReactNode // Options for the select
  error?: string // Error message to display
  delay?: number // Animation delay
  wrapperStyles?: string // Custom styles for the wrapper div
  selectStyles?: string // Custom styles for the select element
  register?: UseFormRegister<any> // Register function from react-hook-form
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select: React.FC<SelectProps> = ({
  label,
  name,
  children,
  error,
  delay = 0,
  wrapperStyles = "",
  selectStyles = "",
  register,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, type: "spring", delay }}
      className={`border-none ${wrapperStyles}`}
    >
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id={name}
        className={`focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 w-full rounded-lg border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${selectStyles}`}
        {...(register ? register(name) : {})}
        {...props}
      >
        {children ? (
          children
        ) : (
          <option key="loading" value="loading" disabled>
            درحال بارگذاری...
          </option>
        )}
      </select>
      {error && <span className="text-rose-500">{error}</span>}
    </motion.div>
  )
}

export default Select
