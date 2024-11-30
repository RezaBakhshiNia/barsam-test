import React from "react"

import Tab from "./components/Tab/Index"

interface TabsProps {
  tabs: Array<{
    label: JSX.Element
    icon: React.ReactNode
    isActive?: boolean
    onClick: () => void
  }>
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="-mb-px flex flex-wrap text-center text-sm font-medium">
        {tabs.map((tab, index) => (
          <Tab key={index} {...tab} delay={1 + +`0.${index}`} />
        ))}
      </ul>
    </div>
  )
}

export default Tabs
