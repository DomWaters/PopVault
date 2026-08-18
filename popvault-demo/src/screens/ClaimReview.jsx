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
  const { itemLabel, itemValue, incidentType, dateOfLoss, description } = state.claim

  const submit = () => {
    updateSlice('claim', { claimNumber: generateClaimNumber() })
    navigate('claim-submitted')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Review your claim" />

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        <div className="bg-vault-panel border border-vault-line rounded-2xl px-5 py-4">
          <p className="text-vault-mute text-xs">Item</p>
          <p className="text-vault-text text-sm font-medium mt-1">{itemLabel}</p>
          {itemValue != null && (
            <p className="text-vault-mute text-xs mt-1">${itemValue.toLocaleString()}</p>
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
