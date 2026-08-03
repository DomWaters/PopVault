// Standard call-to-action button, used at the bottom of nearly every screen.
export default function PrimaryButton({ children, onClick, disabled = false, variant = 'solid' }) {
  const base =
    'w-full py-4 rounded-2xl text-[15px] font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    solid: 'bg-vault-purple text-white active:bg-vault-purpledark',
    outline: 'bg-transparent border border-vault-line text-vault-text active:bg-vault-panel',
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  )
}
