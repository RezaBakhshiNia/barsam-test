export interface BankAccount {
  id: string
  bankName: string
  branchName: string
  accountNumber: string
  accountType: string
  cardNumber: string
  accountHolderName: string
  initialBalance: string
  currency: string
  createdDate: string
  shebaNumber: string[]
  isActive: boolean
}

export type BankAccountFormValues = Omit<BankAccount, "id">
