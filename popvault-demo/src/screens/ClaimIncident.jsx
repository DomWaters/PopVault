import { useState } from 'react'
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

const INCIDENT_TYPES = [
  { key: 'lost', label: 'Lost' },
  { key: 'stolen', label: 'Stolen' },
  { key: 'damaged', label: 'Damaged' },
  { key: 'other', label: 'Other' },
]

export default function ClaimIncident() {
  const { state, navigate, updateSlice } = useAppState()

  const [incidentType, setIncidentType] = useState(state.claim.incidentType)
  const [dateOfLoss, setDateOfLoss] = useState(state.claim.dateOfLoss ?? '')
  const [description, setDescription] = useState(state.claim.description ?? '')

  const canContinue = Boolean(incidentType) && description.trim().length > 0

  const continueToReview = () => {
    updateSlice('claim', {
      incidentType,
      dateOfLoss: dateOfLoss || null,
      description: description.trim(),
    })
    navigate('claim-review')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="What happened?" />

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto">
        <div>
          <label className="block text-vault-text text-sm font-medium mb-2">
            What happened to the item?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {INCIDENT_TYPES.map((type) => (
              <button
                key={type.key}
                onClick={() => setIncidentType(type.key)}
                className={`py-3 rounded-xl text-xs font-medium transition-colors ${
                  incidentType === type.key
                    ? 'bg-vault-purple text-white'
                    : 'bg-vault-panel text-vault-mute border border-vault-line'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-vault-mute text-xs mb-2">Date of loss</label>
          <div className="bg-vault-panel border border-vault-line rounded-2xl px-4 py-3">
            <input
              type="date"
              value={dateOfLoss}
              onChange={(e) => setDateOfLoss(e.target.value)}
              className="bg-transparent text-vault-text text-sm w-full outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-vault-mute text-xs mb-2">Describe what happened</label>
          <div className="bg-vault-panel border border-vault-line rounded-2xl px-4 py-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us what happened..."
              rows={4}
              className="bg-transparent text-vault-text text-sm w-full outline-none resize-none placeholder:text-vault-mute"
            />
          </div>
        </div>
      </div>

      <PrimaryButton disabled={!canContinue} onClick={continueToReview} className="mt-6">
        Continue
      </PrimaryButton>
    </div>
  )
}
