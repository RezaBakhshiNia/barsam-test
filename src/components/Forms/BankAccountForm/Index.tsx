import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { BankAccount, BankAccountFormValues } from "../../../../types/bank-account"
import ControlledDatePicker from "../ControlledDatePicker/Index"
import Input from "../Input/Index"
import PinCodeInput from "../PinCodeInput/Index"
import Toggle from "../RadioButton/Index"
import Select from "../Select/Index"

interface BankAccountFormProps {
  initialData?: BankAccount | null
  onSubmit: (data: BankAccount) => void
  onCancel: () => void
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BankAccountFormValues>()
  const [pinCode, setPinCode] = useState<string>("")

  useEffect(() => {
    if (initialData) {
      reset(initialData)
      setPinCode(initialData.shebaNumber.join(""))
    }
  }, [initialData, reset])

  const handleFormSubmit = (data: BankAccountFormValues) => {
    if (pinCode && onSubmit) {
      onSubmit({
        ...data,
        id: initialData?.id || Math.random().toString(),
        shebaNumber: [pinCode],
      })
    } else if (pinCode) {
      handleInnerSubmit(data)
    }
  }

  const handlePinCodeValue = (code: string) => {
    setPinCode(code)
  }

  const handleInnerSubmit = (data: BankAccountFormValues) => {
    console.log(data)
  }
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto max-w-xl space-y-6 rounded bg-white p-6"
    >
      <h2 className="text-center text-lg font-semibold">
        {initialData ? "ویرایش حساب بانکی" : "افزودن حساب بانکی"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <Select
          selectStyles="block w-full rounded-lg outline-none border border-gray-300 focus:border-gray-400 bg-gray-50 focus:bg-yellow-50 p-2.5 text-sm text-gray-900 focus:ring-gray-400 focus:shadow-inner dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 cursor-pointer"
          label="انتخاب بانک"
          name="bankName"
          error={errors.bankName?.message}
          register={register}
        >
          <option value="bank1">بانک ملت</option>
          <option value="bank2">بانک ملی</option>
          <option value="bank3">بانک صادرات</option>
        </Select>

        <Input
          name="branchName"
          label="نام شعبه"
          register={register}
          error={errors.branchName?.message}
          placeholder="مثال: مرکزی"
        />

        <Input
          name="accountNumber"
          label="شماره حساب"
          register={register}
          error={errors.accountNumber?.message}
          placeholder="شماره حساب خود را وارد کنید"
        />

        <Select
          selectStyles="block w-full rounded-lg outline-none border border-gray-300 focus:border-gray-400 bg-gray-50 focus:bg-yellow-50 p-2.5 text-sm text-gray-900 focus:ring-gray-400 focus:shadow-inner dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 cursor-pointer"
          label="نوع حساب"
          name="accountType"
          error={errors.accountType?.message}
          register={register}
        >
          <option value="current">جاری</option>
          <option value="saving">پس‌انداز</option>
        </Select>

        <Input
          name="cardNumber"
          label="شماره کارت"
          register={register}
          error={errors.cardNumber?.message}
          placeholder="شماره کارت خود را وارد کنید"
        />

        <Input
          name="accountHolderName"
          label="نام دارنده حساب"
          register={register}
          error={errors.accountHolderName?.message}
          placeholder="نام دارنده حساب"
        />

        <Input
          name="initialBalance"
          label="مبلغ اولیه"
          register={register}
          error={errors.initialBalance?.message}
          placeholder="مبلغ اولیه حساب"
          type="number"
        />

        <Select
          selectStyles="block w-full rounded-lg outline-none border border-gray-300 focus:border-gray-400 bg-gray-50 focus:bg-yellow-50 p-2.5 text-sm text-gray-900 focus:ring-gray-400 focus:shadow-inner dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 cursor-pointer"
          label="ارز"
          name="currency"
          error={errors.currency?.message}
          register={register}
        >
          <option value="rial">ریال</option>
          <option value="usd">دلار</option>
          <option value="eur">یورو</option>
        </Select>

        <ControlledDatePicker
          setValue={setValue}
          control={control}
          name="createdDate"
          label="تاریخ افتتاح"
          error={errors.createdDate?.message}
          placeholder="تاریخ افتتاح حساب"
        />

        <Toggle name="isActive" control={control} />
      </div>

      <div dir="ltr">
        <div className="flex items-center gap-2 rtl:space-x-reverse">
          <span className="text-gray-700">IR</span>
          <PinCodeInput length={12} onComplete={handlePinCodeValue} />
        </div>
      </div>

      <div className="flex justify-end space-x-4 rtl:space-x-reverse">
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="rounded bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          {initialData ? "ویرایش حساب بانکی" : "افزودن حساب بانکی"}
        </button>
      </div>
    </form>
  )
}

export default BankAccountForm
