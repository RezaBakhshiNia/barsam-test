import { Control, Controller } from "react-hook-form"

type ToggleProps = {
  name: string // Name for React Hook Form
  control: Control<any> // React Hook Form control object
  label?: string // Optional label for the toggle
  defaultValue?: boolean // Default value for the toggle
  handleChange?: () => void
}

const Toggle: React.FC<ToggleProps> = ({ name, control, label, defaultValue = false, handleChange }) => {
  return (
    <div className="flex items-center gap-4">
      {label && <label className="text-sm font-medium text-gray-900">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <div
            className={`relative h-8 w-24 cursor-pointer rounded-full border-2 bg-white p-1 transition-colors`}
            onClick={() => {
              onChange(!value)
              if (handleChange) {
                handleChange()
              }
            }} // Toggle value when clicked
          >
            <div
              className={`absolute left-0.5 top-0.5 size-6 rounded-full shadow transition-transform ${
                value ? "translate-x-[3.999rem] bg-green-500" : "translate-x-0 bg-gray-200"
              }`}
            ></div>
            {value ? (
              <span className="absolute left-1">فعال</span>
            ) : (
              <span className="absolute right-1">غیر فعال</span>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default Toggle
