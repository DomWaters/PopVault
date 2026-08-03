import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function SuggestedValue() {
  const { state, navigate, updateSlice } = useAppState()
  const { suggestedValue, declaredValue, itemCount } = state.collection

  const setDeclaredValue = (value) => {
    updateSlice('collection', { declaredValue: Math.max(0, value) })
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Suggested coverage" />

      <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-6 text-center">
        <p className="text-vault-mute text-sm">We estimate your collection is worth</p>
        <p className="text-4xl font-bold text-vault-text">
          ${Number(suggestedValue ?? 0).toLocaleString()}
        </p>
        <p className="text-vault-mute text-xs">Based on {itemCount ?? 0} imported items</p>

        <div className="mt-6 w-full max-w-[260px]">
          <label className="block text-vault-mute text-xs mb-2">
            Suggested coverage limit
          </label>
          <div className="flex items-center gap-2 bg-vault-panel border border-vault-line rounded-2xl px-4 py-3">
            <span className="text-vault-mute">$</span>
            <input
              type="number"
              min="0"
              value={declaredValue ?? 0}
              onChange={(e) => setDeclaredValue(Number(e.target.value))}
              className="bg-transparent text-vault-text text-lg font-semibold w-full outline-none"
            />
          </div>
        </div>
      </div>

      <PrimaryButton onClick={() => navigate('questionnaire')}>
        Looks right, continue
      </PrimaryButton>
    </div>
  )
}
