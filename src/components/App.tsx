import { Bank, Card, TableDocument } from "iconsax-react"
import { useState } from "react"

import "../index.css"

import Injector from "./Containers/Injector"
import Tabs from "./Tabs/Index"

function App() {
  const [activeTab, setActiveTab] = useState<string>("PinCodeInput")

  const tabs = [
    {
      label: <span>کارت: تست 1</span>,
      icon: <Card />,
      isActive: activeTab === "PinCodeInput",
      onClick: () => setActiveTab("PinCodeInput"),
    },
    {
      label: <span>بانک: تست 2</span>,
      icon: <Bank />,
      isActive: activeTab === "BankForm",
      onClick: () => setActiveTab("BankForm"),
    },
    {
      label: <span>پیشخوان: تست 3</span>,
      icon: <TableDocument />,
      isActive: activeTab === "Table",
      onClick: () => setActiveTab("Table"),
    },
  ]
  return (
    <div className="relative bg-white font-YekanBold">
      <div className="h-screen">
        <Tabs tabs={tabs} />
        <Injector componentKey={activeTab} />
      </div>
    </div>
  )
}

export default App
