import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

const INCIDENT_LABELS = {
  lost: 'Lost',
  stolen: 'Stolen',
  damaged: 'Damaged',
  other: 'Other',
}

function generateClaimNumber() {
  const digits = Math.floor(10000 + Math.random() * 89999)
  return `CLM-${digits}`
}

export default function ClaimReview() {
  const { state, navigate, updateSlice } = useAppState()
  const { items, incidentType, dateOfLoss, description } = state.claim

  const totalValue = items.reduce((sum, item) => sum + (item.value ?? 0), 0)

  const submit = () => {
    updateSlice('claim', { claimNumber: generateClaimNumber() })
    navigate('claim-submitted')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Review your claim" />

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        <div className="bg-vault-panel border border-vault-line rounded-2xl px-5 py-4">
          <p className="text-vault-mute text-xs">
            {items.length} item{items.length === 1 ? '' : 's'}
          </p>
          <div className="flex flex-col gap-1 mt-1">
            {items.map((item, index) => (
              <div key={`${item.label}-${index}`} className="flex items-center justify-between">
                <p className="text-vault-text text-sm font-medium truncate">{item.label}</p>
                {item.value != null && (
                  <span className="text-vault-mute text-xs whitespace-nowrap">
                    ${item.value.toLocaleString()}
                  </span>
                )}
              </div>
            ))}
          </div>
          {totalValue > 0 && (
            <p className="text-vault-text text-sm font-semibold mt-2">
              Total ${totalValue.toLocaleString()}
            </p>
          )}
        </div>

        <div className="bg-vault-panel border border-vault-line rounded-2xl px-5 py-4">
          <p className="text-vault-mute text-xs">What happened</p>
          <p className="text-vault-text text-sm font-medium mt-1">
            {INCIDENT_LABELS[incidentType] ?? 'Not specified'}
          </p>
          {dateOfLoss && <p className="text-vault-mute text-xs mt-1">on {dateOfLoss}</p>}
        </div>

        <div className="bg-vault-panel border border-vault-line rounded-2xl px-5 py-4">
          <p className="text-vault-mute text-xs">Description</p>
          <p className="text-vault-text text-sm mt-1">{description}</p>
        </div>
      </div>

      <PrimaryButton onClick={submit} className="mt-6">
        Submit claim
      </PrimaryButton>
    </div>
  )
}
