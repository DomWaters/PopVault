import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'

const QUICK_ACTIONS = [
  { icon: '📦', label: 'Collection' },
  { icon: '📝', label: 'File a claim' },
  { icon: '💬', label: 'Ask AI' },
]

export default function Dashboard() {
  const { state, navigate, reset } = useAppState()
  const { policyNumber, billingPlan, collection, pricing } = state

  const amount = billingPlan === 'monthly' ? pricing.totalMonthly : pricing.totalAnnual
  const cadence = billingPlan === 'monthly' ? '/mo' : '/yr'

  const restart = () => {
    reset()
    navigate('welcome')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Dashboard" showBack={false} />

      <div className="flex flex-col gap-5">
        <div className="bg-vault-panel border border-vault-line rounded-2xl px-5 py-4">
          <p className="text-vault-mute text-xs">Policy {policyNumber}</p>
          <p className="text-vault-text text-2xl font-bold mt-1">
            ${Number(collection.declaredValue ?? 0).toLocaleString()}
          </p>
          <p className="text-vault-mute text-xs">
            covered · {collection.itemCount ?? 0} items · ${amount.toFixed(0)}{cadence}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-1.5 bg-vault-panel border border-vault-line rounded-2xl py-4 text-vault-mute active:bg-vault-card"
            >
              <span className="text-xl">{action.icon}</span>
              <span className="text-[11px]">{action.label}</span>
            </button>
          ))}
        </div>
        <p className="text-vault-mute text-[11px] text-center -mt-2">
          Quick actions are illustrative only in this demo.
        </p>
      </div>

      <button onClick={restart} className="mt-auto text-vault-mute text-xs underline">
        Restart demo
      </button>
    </div>
  )
}
