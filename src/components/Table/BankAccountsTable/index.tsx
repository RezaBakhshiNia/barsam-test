import BankAccountForm from "components/Forms/BankAccountForm/Index"
import { Modal } from "components/ui/modal/Index"
import { ToggleSwitch } from "components/ui/switch/Index"
import { Edit2, Trash2 } from "lucide-react"
import { useState } from "react"

import { BankAccount } from "../../../../types/bank-account"

const initialAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "bank1",
    branchName: "مرکزی",
    accountNumber: "123456789",
    accountType: "current",
    cardNumber: "6104337812345678",
    accountHolderName: "علی محمدی",
    initialBalance: "1000000",
    currency: "rial",
    createdDate: "1402/08/15",
    shebaNumber: ["123456789012"],
    isActive: true,
  },
]

export function BankAccountsTable() {
  const [accounts, setAccounts] = useState<BankAccount[]>(initialAccounts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null)

  const handleAddAccount = (data: BankAccount) => {
    if (editingAccount) {
      setAccounts(accounts.map(acc => (acc.id === editingAccount.id ? data : acc)))
      setEditingAccount(null)
    } else {
      setAccounts([...accounts, { ...data, id: Math.random().toString() }])
    }
    setIsModalOpen(false)
  }

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id))
  }

  const handleToggleStatus = (id: string) => {
    setAccounts(accounts.map(acc => (acc.id === id ? { ...acc, isActive: !acc.isActive } : acc)))
  }

  return (
    <div className="w-full" dir="rtl">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">حساب‌های بانکی</h2>
        <button
          onClick={() => {
            setEditingAccount(null)
            setIsModalOpen(true)
          }}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          افزودن
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">ردیف</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">نام بانک</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">نام شعبه</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">شماره حساب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">نوع حساب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">شماره کارت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">دارنده حساب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">موجودی اولیه</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">ارز</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">تاریخ افتتاح</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {accounts.map((account, index) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {account.bankName === "bank1"
                    ? "بانک ملت"
                    : account.bankName === "bank2"
                      ? "بانک ملی"
                      : "بانک صادرات"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{account.branchName}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{account.accountNumber}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {account.accountType === "current" ? "جاری" : "پس‌انداز"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{account.cardNumber}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {account.accountHolderName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {Number(account.initialBalance).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {account.currency === "rial" ? "ریال" : account.currency === "usd" ? "دلار" : "یورو"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{account.createdDate}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  <ToggleSwitch
                    defaultChecked={account.isActive}
                    onCheckedChange={() => handleToggleStatus(account.id)}
                    activeText="فعال"
                    inactiveText="غیرفعال"
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(account)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="rounded p-1 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BankAccountForm
          initialData={editingAccount}
          onSubmit={handleAddAccount}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
