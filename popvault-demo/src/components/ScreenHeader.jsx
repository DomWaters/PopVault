import { useAppState } from '../state.jsx'

// Standard top bar used on every screen except Welcome.
// title: shown centered. showBack: whether to render the back chevron.
export default function ScreenHeader({ title, showBack = true }) {
  const { back } = useAppState()

  return (
    <div className="flex items-center justify-between px-5 pt-14 pb-4">
      <button
        onClick={back}
        className={`w-9 h-9 rounded-full flex items-center justify-center bg-vault-panel text-vault-text ${
          showBack ? '' : 'invisible'
        }`}
        aria-label="Go back"
      >
        ‹
      </button>
      <h1 className="text-base font-medium text-vault-text">{title}</h1>
      <div className="w-9 h-9" />
    </div>
  )
}
