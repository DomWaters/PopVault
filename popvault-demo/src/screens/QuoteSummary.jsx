import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

function Line({ label, value }) {
  if (!value) return null
  const sign = value > 0 ? '+' : '−'
  return (
    <div className="flex items-center justify-between text-sm py-2 border-b border-vault-line last:border-0">
      <span className="text-vault-mute">{label}</span>
      <span className="text-vault-text">
        {sign}${Math.abs(value).toFixed(0)}
      </span>
    </div>
  )
}

export default function QuoteSummary() {
  const { state, navigate } = useAppState()
  const { basePremium, natCatLoading, securityDiscount, highValueLoading, totalAnnual, totalMonthly } =
    state.pricing

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Your quote" />

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center gap-1 text-center pt-4">
          <p className="text-vault-mute text-sm">Estimated annual premium</p>
          <p className="text-4xl font-bold text-vault-text">${totalAnnual.toFixed(0)}</p>
          <p className="text-vault-mute text-xs">${totalMonthly.toFixed(0)}/month</p>
        </div>

        <div className="bg-vault-panel border border-vault-line rounded-2xl px-4 py-2">
          <Line label="Base premium" value={basePremium} />
          <Line label="Nat-cat loading" value={natCatLoading} />
          <Line label="Security discount" value={-securityDiscount} />
          <Line label="High-value items loading" value={highValueLoading} />
        </div>

        <p className="text-vault-mute text-xs text-center">
          Covers accidental damage, transit and theft · no sub-limits
        </p>
      </div>

      <PrimaryButton onClick={() => navigate('bind-pay')} className="mt-6">
        Continue to bind
      </PrimaryButton>
    </div>
  )
}
