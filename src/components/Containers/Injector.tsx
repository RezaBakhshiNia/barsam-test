import BankAccountForm from "components/Forms/BankAccountForm/Index"
import PinCodeInput from "components/Forms/PinCodeInput/Index"
import { BankAccountsTable } from "components/Table/BankAccountsTable"

interface InjectorProps {
  componentKey: string
}

const componentMap = new Map<string, React.FC>([
  ["PinCodeInput", PinCodeInput],
  ["BankForm", BankAccountForm],
  ["Table", BankAccountsTable],
])

const Injector: React.FC<InjectorProps> = ({ componentKey }) => {
  const SelectedComponent = componentMap.get(componentKey)

  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-y-auto">
      <h1 className="text-4xl font-extrabold text-gray-700 dark:text-white">Component Injector</h1>

      {SelectedComponent ? <SelectedComponent /> : <div>No component found!</div>}
    </div>
  )
}

export default Injector
