import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function PolicyIssued() {
  const { state, navigate } = useAppState()
  const { policyNumber, billingPlan } = state
  const { totalAnnual, totalMonthly } = state.pricing

  const amount = billingPlan === 'monthly' ? totalMonthly : totalAnnual
  const cadence = billingPlan === 'monthly' ? '/month' : '/year'

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="" showBack={false} />

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-vault-mint flex items-center justify-center text-2xl text-vault-ink">
          ✓
        </div>
        <h2 className="text-xl font-semibold text-vault-text">You're covered</h2>
        <p className="text-vault-mute text-sm max-w-[260px]">
          Policy {policyNumber} has been issued and emailed to you.
        </p>
        <p className="text-vault-text text-sm font-medium">
          ${amount.toFixed(0)}{cadence}
        </p>
      </div>

      <PrimaryButton onClick={() => navigate('dashboard')} className="mt-6">
        Go to my dashboard
      </PrimaryButton>
    </div>
  )
}
