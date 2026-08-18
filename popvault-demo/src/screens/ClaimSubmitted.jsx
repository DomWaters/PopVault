import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function ClaimSubmitted() {
  const { state, navigate, update } = useAppState()
  const { claimNumber } = state.claim

  const backToDashboard = () => {
    update({
      claim: {
        items: [],
        incidentType: null,
        dateOfLoss: null,
        description: null,
        claimNumber: null,
      },
    })
    navigate('dashboard')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="" showBack={false} />

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-vault-mint flex items-center justify-center text-2xl text-vault-ink">
          ✓
        </div>
        <h2 className="text-xl font-semibold text-vault-text">Claim submitted</h2>
        <p className="text-vault-mute text-sm max-w-[260px]">
          Claim {claimNumber ?? 'reference pending'} has been filed. Our team will review it and
          follow up by email.
        </p>
        <p className="text-vault-mute text-[11px] max-w-[260px]">
          This demo doesn't process real claims.
        </p>
      </div>

      <PrimaryButton onClick={backToDashboard} className="mt-6">
        Back to dashboard
      </PrimaryButton>
    </div>
  )
}
