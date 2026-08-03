import { useAppState } from '../state.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function Welcome() {
  const { navigate } = useAppState()

  return (
    <div className="flex flex-col h-full px-6 pt-24 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-vault-purple flex items-center justify-center text-2xl font-bold text-white mb-2">
          PV
        </div>
        <h1 className="text-2xl font-semibold text-vault-text">PopVault</h1>
        <p className="text-vault-mute text-sm max-w-[260px]">
          Insurance built for collectors. Quote in seconds, bind in minutes.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={() => navigate('import-method')}>Get a quote</PrimaryButton>
        <PrimaryButton variant="outline" onClick={() => navigate('dashboard')}>
          I already have a policy
        </PrimaryButton>
      </div>
    </div>
  )
}
