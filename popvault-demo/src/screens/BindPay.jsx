import { useState } from 'react'
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

function generatePolicyNumber() {
  const digits = Math.floor(10000 + Math.random() * 89999)
  return `POP-${digits}`
}

export default function BindPay() {
  const { state, navigate, update } = useAppState()
  const { totalAnnual, totalMonthly } = state.pricing
  const [agreed, setAgreed] = useState(false)

  const confirm = () => {
    update({ policyNumber: generatePolicyNumber() })
    navigate('policy-issued')
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Bind your policy" />

      <div className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => update({ billingPlan: 'annual' })}
            className={`py-3 rounded-xl text-sm font-medium transition-colors ${
              state.billingPlan === 'annual'
                ? 'bg-vault-purple text-white'
                : 'bg-vault-panel text-vault-mute border border-vault-line'
            }`}
          >
            Pay annually
            <div className="text-xs opacity-80 mt-0.5">${totalAnnual.toFixed(0)}/yr</div>
          </button>
          <button
            onClick={() => update({ billingPlan: 'monthly' })}
            className={`py-3 rounded-xl text-sm font-medium transition-colors ${
              state.billingPlan === 'monthly'
                ? 'bg-vault-purple text-white'
                : 'bg-vault-panel text-vault-mute border border-vault-line'
            }`}
          >
            Pay monthly
            <div className="text-xs opacity-80 mt-0.5">${totalMonthly.toFixed(0)}/mo</div>
          </button>
        </div>

        <div>
          <label className="block text-vault-text text-sm font-medium mb-2">Payment method</label>
          <div className="bg-vault-panel border border-vault-line rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-vault-mute text-sm">Card</span>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              disabled
              className="bg-transparent text-vault-mute text-sm w-full outline-none placeholder:text-vault-mute"
            />
          </div>
          <p className="text-vault-mute text-[11px] mt-1.5">
            Simulated for the demo — no real payment is processed.
          </p>
        </div>

        <label className="flex items-start gap-3 mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-vault-purple"
          />
          <span className="text-vault-mute text-xs">
            I've reviewed the policy documents and agree to e-sign.
          </span>
        </label>
      </div>

      <PrimaryButton disabled={!agreed} onClick={confirm}>
        Confirm and bind
      </PrimaryButton>
    </div>
  )
}
