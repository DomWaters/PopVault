import { useState } from 'react'
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function ClaimItem() {
  const { state, navigate, updateSlice } = useAppState()

  const items = state.collectrRows.map((row, index) => ({
    ...row,
    id: `${row.portfolio}-${row.product}-${index}`,
  }))

  const [selectedId, setSelectedId] = useState(null)
  const [manualLabel, setManualLabel] = useState(state.claim.itemLabel ?? '')

  const selectedItem = items.find((item) => item.id === selectedId)
  const canContinue = items.length > 0 ? Boolean(selectedItem) : manualLabel.trim().length > 0

  const continueToIncident = () => {
    if (items.length > 0) {
      updateSlice('claim', {
        itemLabel: selectedItem.product,
        itemValue: selectedItem.quantity * selectedItem.price,
      })
    } else {
      updateSlice('claim', { itemLabel: manualLabel.trim(), itemValue: null })
    }
    navigate('claim-incident')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="File a claim" />

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <p className="text-vault-mute text-sm text-center">What are you claiming for?</p>

        {items.length > 0 ? (
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left border transition-colors ${
                  selectedId === item.id
                    ? 'bg-vault-purple/10 border-vault-purple'
                    : 'bg-vault-panel border-vault-line'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-vault-text text-sm truncate">{item.product}</p>
                  <p className="text-vault-mute text-xs">
                    {item.portfolio} · qty {item.quantity}
                  </p>
                </div>
                <span className="text-vault-text text-sm font-semibold whitespace-nowrap">
                  ${item.price.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-vault-panel border border-vault-line rounded-2xl px-4 py-3">
            <label className="block text-vault-mute text-xs mb-2">Item description</label>
            <input
              type="text"
              value={manualLabel}
              onChange={(e) => setManualLabel(e.target.value)}
              placeholder="e.g. Charizard PSA 10"
              className="bg-transparent text-vault-text text-sm w-full outline-none placeholder:text-vault-mute"
            />
          </div>
        )}
      </div>

      <PrimaryButton disabled={!canContinue} onClick={continueToIncident} className="mt-6">
        Continue
      </PrimaryButton>
    </div>
  )
}
