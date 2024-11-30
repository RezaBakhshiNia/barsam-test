import { motion } from "framer-motion"

interface TabProps {
  label: JSX.Element
  icon: React.ReactNode
  isActive?: boolean
  onClick: () => void
  delay?: number
}

const Tab: React.FC<TabProps> = ({ label, icon, isActive = false, onClick, delay = 0.1 }) => {
  const baseClasses = "inline-flex items-center gap-2 justify-center p-4 border-b-2 rounded-t-lg group"
  const activeClasses = "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
  const inactiveClasses =
    "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

  return (
    <motion.li
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ delay: delay, duration: 0.6, type: "spring" }}
      dir="rtl"
      className="me-2"
    >
      <a
        href="#"
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
      >
        {icon}
        {label}
      </a>
    </motion.li>
  )
}

export default Tab
