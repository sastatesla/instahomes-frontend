import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "warning" // warning, danger, info
}) {
  if (!isOpen) return null

  const getIconAndColors = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <AlertTriangle size={24} className="text-red-500" />,
          confirmClass: 'bg-red-500 hover:bg-red-600 text-white',
          borderClass: 'border-red-200'
        }
      case 'info':
        return {
          icon: <AlertTriangle size={24} className="text-blue-500" />,
          confirmClass: 'bg-blue-500 hover:bg-blue-600 text-white',
          borderClass: 'border-blue-200'
        }
      default: // warning
        return {
          icon: <AlertTriangle size={24} className="text-yellow-500" />,
          confirmClass: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          borderClass: 'border-yellow-200'
        }
    }
  }

  const { icon, confirmClass, borderClass } = getIconAndColors()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`bg-white rounded-xl p-6 w-full max-w-md border ${borderClass}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {icon}
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-muted-foreground mb-6">{message}</p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${confirmClass}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
