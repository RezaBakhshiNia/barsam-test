import React, { useState } from "react"

interface ToggleSwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  activeText?: string
  inactiveText?: string
}

export const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  (
    {
      defaultChecked = false,
      onCheckedChange,
      activeText = "فعال",
      inactiveText = "غیرفعال",
      className = "",
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useState(defaultChecked)

    const handleToggle = () => {
      const newChecked = !checked
      setChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex h-9 w-24 items-center rounded-full transition-all duration-75 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          checked ? "bg-green-400" : "bg-rose-400"
        } ${className}`}
        onClick={handleToggle}
        ref={ref}
        {...props}
      >
        <span
          className={`absolute inset-1 flex items-center justify-center text-xs font-medium transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        >
          {activeText}
        </span>
        <span
          className={`absolute inset-1 flex items-center justify-center text-xs font-medium transition-opacity ${
            checked ? "opacity-0" : "opacity-100"
          }`}
        >
          {inactiveText}
        </span>
      </button>
    )
  },
)

ToggleSwitch.displayName = "ToggleSwitch"
