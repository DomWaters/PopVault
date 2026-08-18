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

  const [selectedIds, setSelectedIds] = useState([])
  const [manualLabel, setManualLabel] = useState(state.claim.items[0]?.label ?? '')

  const toggleItem = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const canContinue = items.length > 0 ? selectedIds.length > 0 : manualLabel.trim().length > 0

  const continueToIncident = () => {
    if (items.length > 0) {
      const selectedItems = items.filter((item) => selectedIds.includes(item.id))
      updateSlice('claim', {
        items: selectedItems.map((item) => ({
          label: item.product,
          value: item.quantity * item.price,
        })),
      })
    } else {
      updateSlice('claim', { items: [{ label: manualLabel.trim(), value: null }] })
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
                  <p className="text-vault-mute text-xs">
                    {item.portfolio} · qty {item.quantity}
                  </p>
                </div>
                <span className="text-vault-text text-sm font-semibold whitespace-nowrap">
                  ${item.price.toLocaleString()}
                </span>
              </label>
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
