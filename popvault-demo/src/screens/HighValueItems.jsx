import { useState } from 'react'
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { FULL_COVERAGE_THRESHOLD } from '../lib/coverage.js'

export default function HighValueItems() {
  const { state, navigate, updateSlice } = useAppState()

  const highValueItems = state.collectrRows
    .filter((row) => row.price > FULL_COVERAGE_THRESHOLD)
    .map((row, index) => ({ ...row, id: `${row.portfolio}-${row.product}-${index}` }))

  const [selectedIds, setSelectedIds] = useState([])

  const toggleItem = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const selectedTotal = highValueItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.quantity * item.price, 0)

  const continueToSuggestedValue = () => {
    updateSlice('questionnaire', {
      hasHighValueItems: selectedIds.length > 0,
      highValueItemsTotal: Math.round(selectedTotal * 100) / 100,
    })
    navigate('suggested-value')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="High-value items" />

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <p className="text-vault-mute text-sm text-center">
          These items are worth over ${FULL_COVERAGE_THRESHOLD.toLocaleString()}. Select any
          you'd like full coverage for.
        </p>

        <div className="flex flex-col gap-2">
          {highValueItems.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 bg-vault-panel border border-vault-line rounded-2xl px-4 py-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="w-4 h-4 accent-vault-purple shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-vault-text text-sm truncate">{item.product}</p>
                <p className="text-vault-mute text-xs">{item.portfolio}</p>
              </div>
              <span className="text-vault-text text-sm font-semibold whitespace-nowrap">
                ${item.price.toLocaleString()}
              </span>
            </label>
          ))}
        </div>

        {selectedIds.length > 0 && (
          <div className="bg-vault-panel border border-vault-line rounded-2xl px-4 py-4 text-center">
            <p className="text-vault-text text-lg font-semibold">
              ${selectedTotal.toLocaleString()}
            </p>
            <p className="text-vault-mute text-xs mt-1">
              {selectedIds.length} item{selectedIds.length === 1 ? '' : 's'} selected for full
              coverage
            </p>
          </div>
        )}
      </div>

      <PrimaryButton onClick={continueToSuggestedValue}>Continue</PrimaryButton>
    </div>
  )
}
