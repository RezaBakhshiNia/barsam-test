import { motion } from "framer-motion"
import { CalendarAdd } from "iconsax-react"
import { Control, Controller, UseFormSetValue } from "react-hook-form"
import DatePicker from "react-multi-date-picker"

type ControlledDatePickerProps = {
  control: Control<any>
  name: string
  defaultValue?: string | number
  label?: string
  wrapperStyles?: string
  dateStyle?: string
  error?: string | undefined
  setValue: UseFormSetValue<any>
  milisecond?: boolean
  placeholder?: string
  inputDirection?: "ltr" | "rtl"
}

const ControlledDatePicker = ({
  control,
  name,
  defaultValue,
  label,
  wrapperStyles = "",
  dateStyle = "",
  error,
  setValue,
  milisecond = true,
  placeholder = "انتخاب تاریخ",
  inputDirection = "ltr",
}: ControlledDatePickerProps) => {
  // const convertDateToPersianForUser = (originalDate: string) => {
  //   const formattedDate = originalDate.split("/") // resulting in ['MM', 'DD', 'YYYY']
  //   return `${formattedDate[2]}-${formattedDate[0]}-${formattedDate[1]}`
  // }

  const setTimeStamp = (event: any) => {
    console.log(event.unix, "\n", "it means: ", new Date(event.unix * 1000).toLocaleDateString("fa"))
    if (milisecond) {
      setValue(name, (event.unix * 1000) as any)
    } else {
      setValue(name, event.unix as any)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1, type: "spring" }}
      className={`${wrapperStyles}`}
    >
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name as string}
        render={() => (
          <>
            <DatePicker
              portal
              onOpenPickNewDate={true}
              value={new Date()}
              format="YYYY/MM/DD"
              onChange={setTimeStamp}
              render={(value: string, openCalendar: () => void) => (
                <div className={`flex flex-col justify-between gap-2 ${dateStyle}`}>
                  {label && (
                    <label
                      htmlFor={name as string}
                      className="font-YekanBakh text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {label}
                    </label>
                  )}
                  <div
                    onClick={openCalendar}
                    className="flex flex-row-reverse items-center rounded-lg border border-gray-300 bg-gray-50 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <input
                      dir={inputDirection}
                      type="text"
                      autoComplete="off"
                      id={name as string}
                      placeholder={placeholder}
                      className="block w-full rounded-lg bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:bg-yellow-50 focus:shadow-inner focus:ring-gray-400 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      value={value}
                      readOnly
                    />
                    <CalendarAdd />
                  </div>
                </div>
              )}
            />
          </>
        )}
      />
      {error && <small className="text-sm text-rose-600">{error}</small>}
    </motion.div>
  )
}

export default ControlledDatePicker
