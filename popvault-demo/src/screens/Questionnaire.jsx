import { useEffect } from 'react'
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { calculatePricing } from '../lib/pricing.js'

const NAT_CAT_OPTIONS = [
  { value: 'low', label: 'Low risk' },
  { value: 'medium', label: 'Medium risk' },
  { value: 'high', label: 'High risk' },
]

const STORAGE_OPTIONS = [
  { value: 'display', label: 'On display' },
  { value: 'drawer', label: 'Locked drawer' },
  { value: 'safe', label: 'In a safe' },
]

function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`py-2.5 rounded-xl text-xs font-medium transition-colors ${
            value === opt.value
              ? 'bg-vault-purple text-white'
              : 'bg-vault-panel text-vault-mute border border-vault-line'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function Questionnaire() {
  const { state, navigate, updateSlice } = useAppState()
  const { questionnaire, collection } = state

  // Recompute the live price readout any time an answer or the declared
  // value changes — this is the "showcase" the README calls out.
  useEffect(() => {
    const pricing = calculatePricing(collection, questionnaire)
    updateSlice('pricing', pricing)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collection.declaredValue,
    questionnaire.natCatZone,
    questionnaire.storageSecurity,
    questionnaire.hasHighValueItems,
    questionnaire.highValueItemsTotal,
  ])

  const canContinue = Boolean(questionnaire.natCatZone && questionnaire.storageSecurity)

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="A few quick questions" />

      <div className="flex-1 flex flex-col gap-6 pb-6 overflow-y-auto">
        <div>
          <label className="block text-vault-text text-sm font-medium mb-2">
            Where do you live?
          </label>
          <input
            type="text"
            placeholder="City, state or ZIP"
            value={questionnaire.address ?? ''}
            onChange={(e) => updateSlice('questionnaire', { address: e.target.value })}
            className="w-full bg-vault-panel border border-vault-line rounded-2xl px-4 py-3 text-vault-text text-sm outline-none placeholder:text-vault-mute"
          />
        </div>

        <div>
          <label className="block text-vault-text text-sm font-medium mb-2">
            Natural disaster risk in your area
          </label>
          <SegmentedControl
            options={NAT_CAT_OPTIONS}
            value={questionnaire.natCatZone}
            onChange={(v) => updateSlice('questionnaire', { natCatZone: v })}
          />
        </div>

        <div>
          <label className="block text-vault-text text-sm font-medium mb-2">
            How is your collection stored?
          </label>
          <SegmentedControl
            options={STORAGE_OPTIONS}
            value={questionnaire.storageSecurity}
            onChange={(v) => updateSlice('questionnaire', { storageSecurity: v })}
          />
        </div>

        <div className="mt-auto bg-vault-panel border border-vault-line rounded-2xl px-4 py-4 flex items-center justify-between">
          <span className="text-vault-mute text-sm">Estimated annual premium</span>
          <span className="text-vault-text text-xl font-bold">
            ${state.pricing.totalAnnual.toFixed(0)}
          </span>
        </div>
      </div>

      <PrimaryButton disabled={!canContinue} onClick={() => navigate('quote-summary')}>
        See my quote
      </PrimaryButton>
    </div>
  )
}
